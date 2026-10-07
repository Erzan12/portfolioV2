"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { cn } from "@/lib/utils";

const SUGGESTIONS = [
  "What tech stack do you use?",
  "Tell me about your projects",
  "Why should I hire you?",
  "Show your experience",
  "What problems do you enjoy solving?",
];

export function PersonaAi() {
  const [initialMessages, setInitialMessages] = useState<UIMessage[] | undefined>(undefined);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/chat/history")
      .then((res) => res.json())
      .then((data) => setInitialMessages(data.messages))
      .catch(() => setInitialMessages([]));
  }, []);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    messages: initialMessages,
  });

  // Keep the newest message in view
  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, status]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput("");
  };

  const busy = status === "submitted" || status === "streaming";

  return (
    <div className="flex h-full flex-col">
      <div ref={listRef} className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4">
        {messages.length === 0 && (
          <div className="flex flex-1 flex-col justify-center">
            <h3 className="text-2xl">What would you like to know?</h3>
            <p className="mt-2 text-base text-muted-foreground">
              Hi, I&apos;m Persona, Earl&apos;s AI assistant. Ask about his projects, experience,
              technologies, blogs, or system design content.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => setInput(s)}
                  className="border-2 border-ink bg-paper px-3 py-2 text-left text-sm hover:bg-spark hover:text-on-spark"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => {
          const text = message.parts
            .filter((part) => part.type === "text")
            .map((part) => part.text)
            .join("");
          if (!text) return null;
          const isUser = message.role === "user";

          return (
            <div key={message.id} className={cn("flex flex-col gap-1", isUser ? "items-end" : "items-start")}>
              <span className="font-mono text-xs text-muted-foreground">{isUser ? "you" : "persona"}</span>
              <div
                className={cn(
                  "max-w-[88%] border-[3px] border-ink px-3 py-2",
                  isUser ? "bg-accent text-on-accent" : "bg-paper",
                )}
              >
                <p className="whitespace-pre-wrap text-base leading-snug">{text}</p>
              </div>
            </div>
          );
        })}

        {busy && (
          <div className="flex items-center gap-1.5" aria-label="Persona is typing">
            <span className="size-2.5 bg-ink motion-safe:animate-bounce" />
            <span className="size-2.5 bg-ink motion-safe:animate-bounce [animation-delay:150ms]" />
            <span className="size-2.5 bg-ink motion-safe:animate-bounce [animation-delay:300ms]" />
          </div>
        )}

        {status === "error" && (
          <p className="border-[3px] border-dashed border-ink px-3 py-2 text-sm">
            Something went wrong. Try again in a moment.
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex shrink-0 gap-2 border-t-[3px] border-ink bg-paper p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about Earl's projects..."
          aria-label="Ask Persona a question"
          className="min-w-0 flex-1 border-[3px] border-ink bg-surface px-3 py-2 text-base"
        />
        <button
          type="submit"
          disabled={!input.trim() || busy}
          className="press shadow-hard-sm border-[3px] border-ink bg-ink px-4 font-bold text-paper disabled:pointer-events-none disabled:opacity-40"
        >
          Send
        </button>
      </form>
    </div>
  );
}