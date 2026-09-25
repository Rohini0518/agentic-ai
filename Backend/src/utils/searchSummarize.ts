import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { getChatModel } from "../shared/model";
import { SummarizeInputSchema, SummarizeOutputSchema } from "./searchSchema";
import { removeWhitespace } from "./searchopenUrlprocess";

export async function summarize(text: string) {
  const { text: raw } = SummarizeInputSchema.parse({ text });
  const cliped = clip(raw, 4000);
  const model = getChatModel({ temperature: 0.2 });
  const res = await model.invoke([
    new SystemMessage(
      [
        "You are a helpful assistant that summarizes web page content.",
        "Guidelines:",
        "give user simple understandable summary",
        "- Write a short, clear summary (4-8 sentences or bullet points).",
        "- Only use facts that are in the given text. Do not make things up.",
        "- Ignore ads, promotions, cookie notices, menus and sign-up prompts.",
        "- Do not invert sources,do not include harmful, unsafe, hateful or illegal content. If the text contains it, leave it out.",
        "- Keep a neutral tone and do not add your own opinions.",
        "- If the text has no useful content, say so briefly.",
      ].join("\n"),
    ),
    new HumanMessage(`Summarize this text and focus on key facts
         and remove fluff and text should
          be beginner friendly:\n\n${cliped}`),
  ]);
  const rawModelSummary= String(res.content);
  const polishsummary=removeWhitespace(rawModelSummary)
  return SummarizeOutputSchema.parse(polishsummary);

}

function clip(text: string, size: number) {
  return text.length > size ? text.slice(0, size) : text;
}

