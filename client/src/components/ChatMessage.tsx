import { User } from "lucide-react";
import type { Answer } from "@/lib/types";
import { RobotAvatar } from "./RobotAvatar";

export function ChatMessage({ answer }: { answer: Answer }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-end justify-end gap-2">
        <div className="max-w-[75%] rounded-2xl rounded-br-sm bg-amber-400 px-4 py-2 text-sm font-medium text-amber-950 shadow-sm">
          {answer.question}
        </div>
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-amber-600 text-white">
          <User className="size-4" />
        </div>
      </div>

      <div className="flex items-end justify-start gap-2">
        <RobotAvatar />
        <div className="max-w-[75%] rounded-2xl rounded-bl-sm border border-border bg-card p-3 shadow-sm">
          <p className="text-sm leading-relaxed text-foreground">
            {answer.summary}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-1.5 w-full max-w-32 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-amber-500"
                style={{ width: `${Math.round(answer.confidence * 100)}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground">
              {Math.round(answer.confidence * 100)}% confidence
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
