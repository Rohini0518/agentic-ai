import { Sparkles } from "lucide-react";
import { RobotMascot } from "./RobotMascot";

export function ChatHero() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-300 via-amber-400 to-orange-500 px-6 py-8 shadow-lg sm:px-10 sm:py-10">
      <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="max-w-md">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/30 px-3 py-1 text-xs font-semibold text-amber-950 backdrop-blur-sm">
            <Sparkles className="size-3.5" />
            AI Assistant
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-amber-950 sm:text-4xl">
            Ask AI Anything
          </h1>
          <p className="mt-2 text-sm text-amber-950/80 sm:text-base">
            Get instant, structured answers powered by AI — just type your
            question below.
          </p>
        </div>
        <RobotMascot className="h-36 w-36 shrink-0 drop-shadow-lg sm:h-44 sm:w-44" />
      </div>

      <div className="pointer-events-none absolute -right-2 top-6 hidden -rotate-3 rounded-xl bg-white px-3 py-1.5 text-xs font-medium text-amber-900 shadow-md sm:block">
        Hey 👋
      </div>
      <div className="pointer-events-none absolute right-8 bottom-6 hidden rotate-2 rounded-xl bg-white px-3 py-1.5 text-xs font-medium text-amber-900 shadow-md sm:block">
        Let&apos;s create something great ✨
      </div>
    </div>
  );
}
