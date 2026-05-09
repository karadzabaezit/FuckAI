"use client"

import { useEffect, useState } from "react"

import { Message } from "@/components/chat/types"

import { sendMessage } from "@/lib/chatAPI"

import {
  clearChatStorage,
  loadInteractionId,
  loadMessages,
  saveInteractionId,
  saveMessages,
} from "./useChatStorage"

export function useChat() {
  const [mounted, setMounted] = useState(false)
  const [value, setValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [interactionId, setInteractionId] = useState<string | null>(null)

  // HYDRATION RESTORE

  useEffect(() => {
    const storedMessages = loadMessages()
    const storedInteractionId = loadInteractionId()
    if (storedMessages.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMessages(storedMessages)
    }
    if (storedInteractionId) {
      setInteractionId(storedInteractionId)
    }

    setMounted(true)
  }, [])

  const updateMessages = (updater: (prev: Message[]) => Message[]) => {
    setMessages((prev) => {
      const updated = updater(prev)
      saveMessages(updated)

      return updated
    })
  }

  const updateInteractionId = (id: string | null) => {
    setInteractionId(id)
    saveInteractionId(id)
  }

  const clearChat = () => {
    setMessages([])
    updateInteractionId(null)
    clearChatStorage()
  }

  const handleSendMessage = async () => {
    if (!value.trim() || isLoading || isTyping) {
      return
    }
    const userMessage = value.trim()
    setValue("")
    updateMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: "user",
        content: userMessage,
      },
    ])
    setIsLoading(true)
    try {
      const response = await sendMessage(userMessage, interactionId)
      updateInteractionId(response.interactionId)
      updateMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "ai",
          content: response.text,
        },
      ])

      setIsTyping(true)
    } catch (error) {
      console.error(error)
      updateMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "ai",
          content: "Мда уж. Что-то умерло.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return {
    mounted,
    value,
    setValue,
    messages,
    isLoading,
    isTyping,
    setIsTyping,
    handleSendMessage,
    clearChat,
  }
}
