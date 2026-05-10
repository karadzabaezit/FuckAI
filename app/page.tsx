"use client"

import { ChatHeader } from "@/components/chat/ChatHeader"
import { ChatInput } from "@/components/chat/ChatInput"
import { ChatLayout } from "@/components/chat/ChatLayout"
import { ChatMessages } from "@/components/chat/ChatMessages"

import { useChat } from "@/hooks/useChat"

export default function Page() {
  const {
    mounted,
    value,
    setValue,
    messages,
    isLoading,
    isTyping,
    setIsTyping,
    handleSendMessage,
    clearChat,
  } = useChat()

  if (!mounted) {
    return null
  }

  return (
    <ChatLayout>
      <ChatHeader />

      <ChatMessages
        messages={messages}
        isLoading={isLoading}
        isTyping={isTyping}
        onTypingEnd={() => setIsTyping(false)}
      />

      <ChatInput
        value={value}
        setValue={setValue}
        onSend={handleSendMessage}
        onClear={clearChat}
        disabled={isLoading || isTyping}
        maxLength={2000}
      />
    </ChatLayout>
  )
}
