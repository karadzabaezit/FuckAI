"use client";

import { ChatInput } from "@/components/chat/ChatInput";
import { ChatLayout } from "@/components/chat/ChatLayout";
import { ChatMessages } from "@/components/chat/ChatMessages";
import { Header } from "@/components/layout/Header";

import { useChat } from "@/hooks/useChat";

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
    personality,
    setPersonality,
  } = useChat();

  if (!mounted) {
    return null;
  }

  return (
    <>
      <ChatLayout>
        <Header />
        <ChatMessages
          messages={messages}
          isLoading={isLoading}
          isTyping={isTyping}
          onTypingEnd={() => setIsTyping(false)}
        />

        <ChatInput
          personality={personality}
          setPersonality={setPersonality}
          value={value}
          setValue={setValue}
          onSend={handleSendMessage}
          onClear={clearChat}
          disabled={isLoading || isTyping}
          maxLength={2000}
        />
      </ChatLayout>
    </>
  );
}
