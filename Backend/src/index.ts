import { env } from "./shared/env";
import { helloGemini, helloGroq } from "./provider";

async function modelProvider() {
  const provider = env.LLM_PROVIDER;
console.log("provider",provider)
  let result;
  if (provider === "gemini") {
    result = await helloGemini();
  } else {
    result = await helloGroq();
  }

  console.log(result);
}

modelProvider().catch((err) => {
  console.error(err);
});
