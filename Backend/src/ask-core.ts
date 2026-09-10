import { createChatModel } from "./models/lc_model";
import { AskResult, AskResultSchema } from "./schema";

export async function askStructured(query: string): Promise<AskResult> {
  const { model } = createChatModel();
  // keep the instruction brief so that the schema stays visible to model

  const systemInst = "You are a concise assistant, return only requested JSON";
  const userInst = `Summarize for a beginner ${query}`;

  const structered = model.withStructuredOutput(AskResultSchema);
  console.log("structured output", structered);
  const result = await structered.invoke([
    {
      role: "system",
      content: systemInst,
    },
    {
      role: "user",
      content: userInst,
    },
  ]);
  console.log("result", result);
  return result;
}
