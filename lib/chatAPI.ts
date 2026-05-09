import axios from "axios"

export type SendMessageResponse = {
  text: string
  interactionId: string
}

export const sendMessage = async (
  message: string,
  previousInteractionId?: string | null
): Promise<SendMessageResponse> => {
  const payload: {
    message: string
    previousInteractionId?: string
  } = {
    message,
  }

  if (previousInteractionId) {
    payload.previousInteractionId = previousInteractionId
  }

  const { data } = await axios.post("/api/chat", payload)

  return data
}
