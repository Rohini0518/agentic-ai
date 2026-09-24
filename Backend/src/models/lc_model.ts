import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatGroq } from "@langchain/groq";
import { env } from "../shared/env";

export type Provider = "gemini" | "groq";

const base = { temperature: 0.3 } as const;

export function createChatModel(preferredProvider: Provider = env.LLM_PROVIDER) {
  if (preferredProvider === "gemini") {
    if (!env.GEMINI_API_KEY) throw new Error("GEMINI_API_KEY is not set in .env");
    return {
      provider: "gemini" as const,
      model: new ChatGoogleGenerativeAI({ ...base, model: env.GEMINI_MODEL }),
    };
  }

  if (!env.GROQ_API_KEY) throw new Error("GROQ_API_KEY is not set in .env");
  return {
    provider: "groq" as const,
    model: new ChatGroq({ ...base, model: env.GROQ_MODEL }),
  };
}
