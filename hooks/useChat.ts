"use client";

import { useEffect, useState } from "react";

import { Message } from "@/components/chat/types";

import { sendMessage } from "@/lib/chatAPI";
import { generateId } from "@/lib/utils";

import axios from "axios";

import {
  clearChatStorage,
  loadMessages,
  loadPersonality,
  saveMessages,
  savePersonality,
} from "./useChatStorage";

import { Personality } from "@/lib/personalities";

export function useChat() {
  const [mounted, setMounted] = useState(false);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [personality, setPersonality] = useState<Personality>("kazakh");

  useEffect(() => {
    const storedMessages = loadMessages();
    if (storedMessages.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMessages(storedMessages);
    }
    // Personality loading from local
    setPersonality(loadPersonality());

    setMounted(true);
  }, []);

  useEffect(() => {
    savePersonality(personality);
  }, [personality]);

  const updateMessages = (updater: (prev: Message[]) => Message[]) => {
    setMessages((prev) => {
      const updated = updater(prev);
      saveMessages(updated);
      return updated;
    });
  };

  const clearChat = () => {
    setMessages([]);
    clearChatStorage();
  };

  const handleSendMessage = async () => {
    if (!value.trim() || isLoading || isTyping) {
      return;
    }
    const userMessage = value.trim();
    setValue("");
    const nextMessages = [
      ...messages,
      {
        id: generateId(),
        role: "user" as const,
        content: userMessage,
      },
    ];

    updateMessages(() => nextMessages);

    setIsLoading(true);

    try {
      const response = await sendMessage(
        userMessage,
        nextMessages,
        personality
      );

      updateMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          role: "assistant",
          content: response.text,
        },
      ]);

      setIsTyping(true);
    } catch (error) {
      console.error(error);

      let errorMessage = "Мда уж. Что-то сдохло.";

      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 429) {
          errorMessage = "Лимит кончился, брат. Потрогай траву пока.";
        } else if (status === 500) {
          errorMessage = "Сервер умер. Жесть конечно.";
        } else if (status === 401) {
          errorMessage = "API key сдох. Ну ты дал.";
        }
      }

      updateMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          role: "assistant",
          content: errorMessage,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    personality,
    setPersonality,
    mounted,
    value,
    setValue,
    messages,
    isLoading,
    isTyping,
    setIsTyping,
    handleSendMessage,
    clearChat,
  };
}
