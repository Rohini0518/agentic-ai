"use client";

import { useState } from "react";
import { Loader2, Send, Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

type Answer = {
  summary: string;
  confidence: number;
};

export const FirstChatAi = () => {
  const [query, setQuery] = useState("");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setAnswers((prev) => [data, ...prev]);
      setQuery("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get an answer");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 p-4">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="size-5 text-primary" />
            Ask AI
          </CardTitle>
          <CardDescription>
            Ask a question and get an instant AI-generated answer.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-3">
          {answers.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border py-10 text-center">
              <Sparkles className="size-6 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                No answers yet. Ask a question below.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {answers.map((ans, ind) => (
                <div
                  key={ind}
                  className="rounded-lg border border-border bg-muted/40 p-3"
                >
                  <p className="text-sm leading-relaxed text-foreground">
                    {ans.summary}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1.5 w-full max-w-32 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{
                          width: `${Math.round(ans.confidence * 100)}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {Math.round(ans.confidence * 100)}% confidence
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}
        </CardContent>

        <CardFooter className="flex-col items-stretch gap-2 border-t bg-transparent p-4">
          <Textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your question..."
            className="min-h-20 resize-none"
            disabled={loading}
          />
          <Button
            onClick={handleAsk}
            disabled={loading || !query.trim()}
            className="self-end"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Asking...
              </>
            ) : (
              <>
                <Send className="size-4" />
                Ask
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
