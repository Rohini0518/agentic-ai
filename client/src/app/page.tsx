import { FirstChatAi } from "@/components/FirstChatAi";

export default function Home() {
  return (
    <div className="flex h-full min-h-0 flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex h-full w-full min-h-0 items-stretch justify-center">
        <FirstChatAi />
      </main>
    </div>
  );
}
