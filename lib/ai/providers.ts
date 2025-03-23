import { customProvider, extractReasoningMiddleware, wrapLanguageModel } from "ai";
import { groq } from "@ai-sdk/groq";
import { xai } from "@ai-sdk/xai";
import { isTestEnvironment } from "../constants";
import { createOllama, ollama } from "ollama-ai-provider";

const createdOllama = createOllama({
  // optional settings, e.g.
  baseURL: "https://api.ollama.com",
});

const gemma = ollama("gemma3:1b");
const modelFromEmbeddings = ollama.embedding("nomic-embed-text");

// export const myProvider = isTestEnvironment
//   ? customProvider({
//       languageModels: {
//         "chat-model": chatModel,
//         "chat-model-reasoning": reasoningModel,
//         "title-model": titleModel,
//         "artifact-model": artifactModel,
//       },
//     })
//   : customProvider({
//       languageModels: {
//         "chat-model": xai("grok-2-1212"),
//         "chat-model-reasoning": wrapLanguageModel({
//           model: groq("deepseek-r1-distill-llama-70b"),
//           middleware: extractReasoningMiddleware({ tagName: "think" }),
//         }),
//         "title-model": xai("grok-2-1212"),
//         "artifact-model": xai("grok-2-1212"),
//       },
//       imageModels: {
//         "small-model": xai.image("grok-2-image"),
//       },
//     });

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        "chat-model": wrapLanguageModel({
          model: gemma,
          middleware: extractReasoningMiddleware({ tagName: "think" }),
        }),
        "chat-model-reasoning": wrapLanguageModel({
          model: gemma,
          middleware: extractReasoningMiddleware({ tagName: "think" }),
        }),
        "title-model": wrapLanguageModel({
          model: gemma,
          middleware: extractReasoningMiddleware({ tagName: "think" }),
        }),
        "artifact-model": wrapLanguageModel({
          model: gemma,
          middleware: extractReasoningMiddleware({ tagName: "think" }),
        }),
      },
    })
  : customProvider({
      languageModels: {
        "chat-model": xai("grok-2-1212"),
        "chat-model-reasoning": wrapLanguageModel({
          model: groq("deepseek-r1-distill-llama-70b"),
          middleware: extractReasoningMiddleware({ tagName: "think" }),
        }),
        "title-model": xai("grok-2-1212"),
        "artifact-model": xai("grok-2-1212"),
      },
      imageModels: {
        "small-model": xai.image("grok-2-image"),
      },
    });
