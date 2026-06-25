"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useState } from "react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { ArrowUp, Sparkles } from "lucide-react";
import clsx from "clsx";
import { routeThemeConfig } from "@/lib/constants/themes";

type RouteTheme = typeof routeThemeConfig[keyof typeof routeThemeConfig];

interface PersonaAiProps {
  theme: RouteTheme;
}

export function PersonaAi({ theme }: PersonaAiProps) {
  const [initialMessages, setInitialMessages] = useState<
    UIMessage[] | undefined
  >(undefined);

  const [input, setInput] = useState("");

  useEffect(() => {
    fetch("/api/chat/history")
      .then((res) => res.json())
      .then((data) => setInitialMessages(data.messages))
      .catch(() => setInitialMessages([]));
  }, []);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
    messages: initialMessages,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput("");
  };

  const aiBubbleClass = clsx(
    "max-w-[85%]",
    "rounded-2xl",
    "rounded-tl-md",
    "border",
    "border-slate-500/10",
    "bg-slate-500/[0.03]",
    "dark:bg-white/[0.02]",
    "backdrop-blur-sm",
    "px-4",
    "py-3"
  );

  const userBubbleClass = clsx(
    "max-w-[80%]",
    "rounded-2xl",
    "rounded-br-md",
    "px-4",
    "py-3",
    "border border-slate-500/10",
    "bg-white/70",
    "dark:bg-slate-900/60",
    "backdrop-blur-md",
    theme.userBubble
  );

  const suggestions = [
    "What tech stack do you use?",
    "Tell me about your projects?",
    "Why should I hire you?",
    "Show your experience",
    "What problems do you enjoy solving?",
  ];

  return (
    <div className="relative flex flex-col h-full overflow-hidden">
      {/* Left accent bar — now safely contained by the relative flex parent */}
      <div
        className={clsx(
          "absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl",
          "bg-gradient-to-b",
          theme.gradient
        )}
      />

      {/* Messages */}
      <div className="flex-1 flex flex-col gap-4 overflow-y-auto p-6 pl-8 min-h-0">
        {messages.length === 0 && (
          <div className="flex flex-1 flex-col items-center justify-center">
            <div
              className={clsx(
                "mb-6",
                "flex h-14 w-14 items-center justify-center",
                "rounded-2xl",
                "border border-slate-500/10",
                "bg-white/50 dark:bg-slate-900/40",
                "backdrop-blur-md"
              )}
            >
              <Sparkles className="h-6 w-6 text-slate-700 dark:text-slate-300" />
            </div>

            <h3 className="mb-2 text-lg font-semibold">
              What would you like to know?
            </h3>

            <p className="mb-6 text-center text-sm text-muted-foreground">
              Hi I'm Persona ask me about Earl's projects, experience,
              technologies, blogs or system design content.
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setInput(suggestion)}
                  className={clsx(
                    "rounded-2xl",
                    "border border-slate-500/10",
                    "bg-slate-500/[0.03]",
                    "dark:bg-white/[0.02]",
                    "px-4 py-3",
                    "text-sm",
                    "transition-all duration-300",
                    "hover:-translate-y-1",
                    "hover:border-slate-400/20"
                  )}
                >
                  {suggestion}
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

          const isUser = message.role === "user";

          return (
            <div
              key={message.id}
              className={isUser ? "flex justify-end" : "flex items-start gap-3"}
            >
              {!isUser && (
                <div
                  className="
                    flex h-9 w-9 shrink-0 items-center justify-center
                    rounded-xl border border-slate-500/10
                    bg-white/50 dark:bg-slate-900/40
                    backdrop-blur-md
                  "
                >
                  <Sparkles className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                </div>
              )}

              <div className={isUser ? userBubbleClass : aiBubbleClass}>
                <p className="whitespace-pre-wrap text-sm leading-relaxed">
                  {text}
                </p>
              </div>
            </div>
          );
        })}

        {/* Streaming Indicator */}
        {status === "streaming" && (
          <div className="flex items-center gap-2 pl-12">
            <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
          </div>
        )}
      </div>
      {/* Form — OUTSIDE the scrollable div, sibling to it */}
        <form
            onSubmit={handleSubmit}
            className="shrink-0 border-t bg-background/60 p-4 "
        >
        <div className={"flex items-center gap-2 rounded-2xl border bg-background px-3 py-2"}>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Earl's projects..."
                className="flex-1 border-none bg-transparent text-sm outline-none"
            />
            <button
                type="submit"
                disabled={!input.trim() || status === "streaming"}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-900 text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
            <ArrowUp className="h-4 w-4" />
            </button>
        </div>
        </form>
    </div>
  );
}