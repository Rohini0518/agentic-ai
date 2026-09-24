"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { ChatHero } from "./ChatHero";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import type { Answer } from "@/lib/types";

export const FirstChatAi = () => {
  const [query, setQuery] = useState("");
  const [answers, setAnswers] = useState<Answer[]>([
    { question: "hello", summary: "Hello,How Are You Today.", confidence: 0.9 },

  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [answers.length]);

  const handleAsk = async () => {
    if (!query.trim() || loading) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();

      if (!res.ok || !data.summary || typeof data.confidence !== "number") {
        throw new Error(data.error || "Something went wrong");
      }

      setAnswers((prev) => [...prev, { ...data, question: query }]);
      setQuery("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get an answer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex h-full w-full max-w-2xl min-h-0 flex-col gap-4 p-4">
      <ChatHero />

      <Card className="min-h-0 flex-1 shadow-lg">
        <CardContent className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pt-6">
          {answers.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border py-10 text-center">
              <Sparkles className="size-6 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                No answers yet. Ask a question below.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {answers.map((ans, ind) => (
                <ChatMessage key={ind} answer={ans} />
              ))}
              <div ref={bottomRef} />
            </div>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}
        </CardContent>

        <CardFooter className="flex-col items-stretch gap-2 border-t bg-transparent p-4">
          <ChatInput
            value={query}
            onChange={setQuery}
            onSend={handleAsk}
            loading={loading}
          />
        </CardFooter>
      </Card>
    </div>
  );
};
