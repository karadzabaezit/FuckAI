// import axios from "axios"

// export type SendMessageResponse = {
//   text: string
//   interactionId: string
// }

// export const sendMessage = async (
//   message: string,
//   previousInteractionId?: string | null
// ): Promise<SendMessageResponse> => {
//   const payload: {
//     message: string
//     previousInteractionId?: string
//   } = {
//     message,
//   }

//   if (previousInteractionId) {
//     payload.previousInteractionId = previousInteractionId
//   }

//   const { data } = await axios.post("/api/chat", payload)

//   return data
// }

import axios from "axios"

import { Message } from "@/components/chat/types"

export type SendMessageResponse = {
  text: string

  reasoningDetails?: unknown
}

export const sendMessage = async (
  message: string,
  messages: Message[]
): Promise<SendMessageResponse> => {
  const { data } = await axios.post("/api/chat", {
    messages: messages.slice(-10),
  })

  return data
}
