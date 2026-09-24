import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const EnvSchema = z.object({
  PORT: z.string().default("9000"),
  LLM_PROVIDER: z.enum(["gemini", "groq"]).default("gemini"),
  GEMINI_API_KEY: z.string().optional(),
  GROQ_API_KEY: z.string().optional(),
  GEMINI_MODEL: z.string().default("gemini-3.6-flash"),
  GROQ_MODEL: z.string().default("openai/gpt-oss-20b"),
  SEARCH_PROVIDER: z.string().default("tavily"),
  TAVILY_API_KEY: z.string().optional(),
});

export type Env = z.infer<typeof EnvSchema>;

export const env: Env = EnvSchema.parse(process.env);
