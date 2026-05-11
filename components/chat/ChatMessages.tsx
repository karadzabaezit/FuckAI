import { ScrollArea } from "@/components/ui/scroll-area";

import { ChatMessage } from "@/components/chat/ChatMessage";
import { useEffect, useRef } from "react";
import { AnimatedShinyText } from "../ui/animated-shiny-text";
import { Message } from "./types";

type Props = {
  messages: Message[];
  isLoading: boolean;
  isTyping: boolean;
  onTypingEnd: () => void;
};

export function ChatMessages({
  messages,
  isLoading,
  isTyping,
  onTypingEnd,
}: Props) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  return (
    <div className="min-h-0 flex-1">
      <ScrollArea className="h-full">
        <div className="flex flex-col gap-6 px-1 pb-32 md:px-6">
          {messages.map((message, index) => (
            <ChatMessage
              key={message.id}
              message={message}
              isLast={index === messages.length - 1}
              isTyping={isTyping}
              onTypingEnd={onTypingEnd}
            />
          ))}

          {(isLoading || isTyping || true) && (
            <AnimatedShinyText className="m-0 w-fit text-sm text-muted-foreground">
              Thinking...
            </AnimatedShinyText>
          )}

          <div ref={bottomRef} />
        </div>
      </ScrollArea>
    </div>
  );
}
