// "use client"

// import { useEffect, useState } from "react"

// import { Message } from "@/components/chat/types"

// import { sendMessage } from "@/lib/chatAPI"

// import { generateId } from "@/lib/utils"
// import axios from "axios"
// import {
//   clearChatStorage,
//   loadInteractionId,
//   loadMessages,
//   saveInteractionId,
//   saveMessages,
// } from "./useChatStorage"

// export function useChat() {
//   const [mounted, setMounted] = useState(false)
//   const [value, setValue] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const [isTyping, setIsTyping] = useState(false)
//   const [messages, setMessages] = useState<Message[]>([])
//   const [interactionId, setInteractionId] = useState<string | null>(null)

//   // HYDRATION RESTORE

//   useEffect(() => {
//     const storedMessages = loadMessages()
//     const storedInteractionId = loadInteractionId()
//     if (storedMessages.length > 0) {
//       // eslint-disable-next-line react-hooks/set-state-in-effect
//       setMessages(storedMessages)
//     }
//     if (storedInteractionId) {
//       setInteractionId(storedInteractionId)
//     }

//     setMounted(true)
//   }, [])

//   const updateMessages = (updater: (prev: Message[]) => Message[]) => {
//     setMessages((prev) => {
//       const updated = updater(prev)
//       saveMessages(updated)

//       return updated
//     })
//   }

//   const updateInteractionId = (id: string | null) => {
//     setInteractionId(id)
//     saveInteractionId(id)
//   }

//   const clearChat = () => {
//     setMessages([])
//     updateInteractionId(null)
//     clearChatStorage()
//   }

//   const handleSendMessage = async () => {
//     if (!value.trim() || isLoading || isTyping) {
//       return
//     }
//     const userMessage = value.trim()
//     setValue("")
//     updateMessages((prev) => [
//       ...prev,
//       {
//         id: generateId(),
//         role: "user",
//         content: userMessage,
//       },
//     ])
//     setIsLoading(true)
//     try {
//       const response = await sendMessage(userMessage, interactionId)
//       updateInteractionId(response.interactionId)
//       updateMessages((prev) => [
//         ...prev,
//         {
//           id: generateId(),
//           role: "ai",
//           content: response.text,
//         },
//       ])

//       setIsTyping(true)
//     } catch (error) {
//       console.error(error)

//       let errorMessage = "Мда уж. Что-то сдохло."

//       if (axios.isAxiosError(error)) {
//         const status = error.response?.status

//         const apiMessage = error.response?.data?.error?.message

//         if (status === 429) {
//           errorMessage =
//             "Лимит кончился, брат. Gemini сказал: иди потрогай траву."
//         } else if (status === 500) {
//           errorMessage = "Сервер умер. Жесть конечно."
//         } else if (status === 401) {
//           errorMessage = "API key сдох или невалидный. Ну ты дал."
//         } else if (apiMessage) {
//           errorMessage = "Мда уж. Что-то умерло."
//         }
//       }
//       updateMessages((prev) => [
//         ...prev,
//         {
//           id: generateId(),
//           role: "ai",
//           content: errorMessage,
//         },
//       ])
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return {
//     mounted,
//     value,
//     setValue,
//     messages,
//     isLoading,
//     isTyping,
//     setIsTyping,
//     handleSendMessage,
//     clearChat,
//   }
// }

"use client"

import { useEffect, useState } from "react"

import { Message } from "@/components/chat/types"

import { sendMessage } from "@/lib/chatAPI"
import { generateId } from "@/lib/utils"

import axios from "axios"

import { clearChatStorage, loadMessages, saveMessages } from "./useChatStorage"

export function useChat() {
  const [mounted, setMounted] = useState(false)
  const [value, setValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    const storedMessages = loadMessages()
    if (storedMessages.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMessages(storedMessages)
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

  const clearChat = () => {
    setMessages([])
    clearChatStorage()
  }

  const handleSendMessage = async () => {
    if (!value.trim() || isLoading || isTyping) {
      return
    }
    const userMessage = value.trim()
    setValue("")
    const nextMessages = [
      ...messages,
      {
        id: generateId(),
        role: "user" as const,
        content: userMessage,
      },
    ]

    updateMessages(() => nextMessages)

    setIsLoading(true)

    try {
      const response = await sendMessage(userMessage, nextMessages)

      updateMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          role: "assistant",
          content: response.text,
        },
      ])

      setIsTyping(true)
    } catch (error) {
      console.error(error)

      let errorMessage = "Мда уж. Что-то сдохло."

      if (axios.isAxiosError(error)) {
        const status = error.response?.status

        if (status === 429) {
          errorMessage = "Лимит кончился, брат. Потрогай траву пока."
        } else if (status === 500) {
          errorMessage = "Сервер умер. Жесть конечно."
        } else if (status === 401) {
          errorMessage = "API key сдох. Ну ты дал."
        }
      }

      updateMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          role: "assistant",
          content: errorMessage,
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
