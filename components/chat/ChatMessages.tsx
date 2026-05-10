import { ScrollArea } from "@/components/ui/scroll-area"

import { ChatMessage } from "@/components/chat/ChatMessage"
import { useEffect, useRef } from "react"
import { Message } from "./types"

type Props = {
  messages: Message[]
  isLoading: boolean
  isTyping: boolean
  onTypingEnd: () => void
}

export function ChatMessages({
  messages,
  isLoading,
  isTyping,
  onTypingEnd,
}: Props) {
  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    })
  }, [messages])

  return (
    <ScrollArea className="flex-1">
      <div className="flex flex-col gap-6 px-1 pt-28 pb-32 md:px-6">
        {messages.map((message, index) => (
          <ChatMessage
            key={message.id}
            message={message}
            isLast={index === messages.length - 1}
            isTyping={isTyping}
            onTypingEnd={onTypingEnd}
          />
        ))}

        {(isLoading || isTyping) && (
          <div className="text-sm text-muted-foreground">Thinking...</div>
        )}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  )
}
