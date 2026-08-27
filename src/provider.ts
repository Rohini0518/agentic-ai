import { GoogleGenAI } from "@google/genai";

type Provider = "gemini" | "groq";

type HelloOutput = {
  ok: true;
  provider: Provider;
  model: string;
  message: string;
};

export async function helloGemini(): Promise<HelloOutput> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("Gemini api key is not present!");

  const model = "gemini-3.5-flash-lite";
  const ai = new GoogleGenAI({ apiKey });

  const response = await ai.models.generateContent({
    model,
    contents: "tell about tirupathi in one short sentence.",
  });

  return {
    ok: true,
    provider: "gemini",
    model,
    message: response.text ?? "",
  };
} 