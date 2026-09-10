import "dotenv/config";
import express from "express";
import cors from "cors";
import { loadEnvFile } from "./env";
import { askStructured } from "./ask-core";

loadEnvFile();
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/askmodel", async (req, res) => {
  try {
    const { query } = req.body ?? {};
    if (!query || !String(query).trim()) {
      return res
        .status(400)
        .json({ error: `Fields query ${query} is required` });
    }
    const output = await askStructured(query);
    return res.status(200).json(output);
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      error: "Failed to answer",
    });
  }
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Backend is running in port ${PORT}`);
});