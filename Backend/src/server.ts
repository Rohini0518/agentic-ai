import express from "express";
import cors from "cors";
import { env } from "./shared/env";
import { askStructured } from "./ask-core";

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

app.listen(env.PORT, () => {
  console.log(`Backend is running in port ${env.PORT}`);
});