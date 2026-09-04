import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatGroq } from "@langchain/groq";
import { loadEnvFile } from "../env";

loadEnvFile();

export type Provider = "google" | "groq";

const base = { temperature: 0.3 } as const;

export function createChatModel(forced?: Provider) {
  const hasGemini = !!process.env.GEMINI_API_KEY;
  const hasGroq = !!process.env.GROQ_API_KEY;

  if (forced === "google" || (!forced && hasGemini)) {
    return {
      provider: "google" as const,
      model: new ChatGoogleGenerativeAI({ ...base, model: "gemini-2.5-flash" }),
    };
  }

  if (forced === "groq" || (!forced && hasGroq)) {
    return {
      provider: "groq" as const,
      model: new ChatGroq({ ...base, model: "llama-3.3-70b-versatile" }),
    };
  }

  throw new Error(
    "No LLM provider API key found. Set GEMINI_API_KEY or GROQ_API_KEY in .env"
  );
}
