import { loadEnvFile } from "./env";
import { helloGemini, helloGroq } from "./provider";

loadEnvFile();

async function modelProvider() {
  const provider = process.env.PROVIDER;
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
