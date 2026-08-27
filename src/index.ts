import { loadEnvFile } from "./env";
import { helloGemini } from "./provider";

loadEnvFile();

helloGemini()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.error(err);
  });
