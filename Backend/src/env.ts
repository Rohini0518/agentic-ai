import dotenv from "dotenv";

let loaded = false;

export function loadEnvFile(): void {
  if (loaded) return;
  dotenv.config();
  loaded=true;
}
