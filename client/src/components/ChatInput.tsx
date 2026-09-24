"use client";

import { Loader2, Send } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

type ChatInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  loading: boolean;
};

export function ChatInput({ value, onChange, onSend, loading }: ChatInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your question..."
        className="min-h-20 resize-none"
        disabled={loading}
      />
      <Button
        onClick={onSend}
        disabled={loading || !value.trim()}
        className="self-end bg-amber-500 text-amber-950 hover:bg-amber-400"
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
    </>
  );
}
