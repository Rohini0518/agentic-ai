import { GoogleGenAI } from "@google/genai";
import Groq from "groq-sdk";

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
    message: response.text ?? "NA",
  };
}

export async function helloGroq(): Promise<HelloOutput> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("Groq api key is not present!");

  const model = "openai/gpt-oss-20b";
  const groq = new Groq({ apiKey });

  const response = await groq.chat.completions.create({
    model,
    messages: [{ role: "user", content: "tell about rajahmundry in one short sentence." }],
  });

  return {
    ok: true,
    provider: "groq",
    model,
    message: response.choices[0].message.content ?? "NA",
  };
}