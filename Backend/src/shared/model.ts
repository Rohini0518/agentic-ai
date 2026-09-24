import type { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatGroq } from "@langchain/groq";
import { env } from "./env";

type ModelOpts = {
  temperature?: number;
  maxTokens?: number;
};

export function getChatModel(opts: ModelOpts = {}): BaseChatModel {
  // low temperature -> crisp, consistent answers
  const temp = opts.temperature ?? 0.2;

  switch (env.LLM_PROVIDER) {
    case "gemini":
      return new ChatGoogleGenerativeAI({
        apiKey: env.GEMINI_API_KEY,
        model: env.GEMINI_MODEL,
        temperature: temp,
        maxOutputTokens: opts.maxTokens,
      });

    case "groq":
      return new ChatGroq({
        apiKey: env.GROQ_API_KEY,
        model: env.GROQ_MODEL,
        temperature: temp,
        maxTokens: opts.maxTokens,
      });

    default:
      throw new Error(`Unsupported LLM_PROVIDER: ${env.LLM_PROVIDER}`);
  }
}
