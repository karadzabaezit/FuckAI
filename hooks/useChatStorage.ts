import { Message } from "@/components/chat/types"
import { INTERACTION_KEY, PERSONALITY_KEY, STORAGE_KEY } from "@/lib/constants"
import { Personality } from "@/lib/personalities"

export const loadMessages = (): Message[] => {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem(STORAGE_KEY)

    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}
export function loadPersonality(): Personality {
  if (typeof window === "undefined") {
    return "kazakh"
  }
  const stored = localStorage.getItem(PERSONALITY_KEY) as Personality | null

  return stored || "kazakh"
}

export const saveMessages = (messages: Message[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
}

export const loadInteractionId = (): string | null => {
  if (typeof window === "undefined") {
    return null
  }

  return localStorage.getItem(INTERACTION_KEY)
}

export const saveInteractionId = (id: string | null) => {
  if (!id) {
    localStorage.removeItem(INTERACTION_KEY)

    return
  }

  localStorage.setItem(INTERACTION_KEY, id)
}

export const clearChatStorage = () => {
  localStorage.removeItem(STORAGE_KEY)

  localStorage.removeItem(INTERACTION_KEY)
}

export function savePersonality(personality: Personality) {
  localStorage.setItem(
    PERSONALITY_KEY,

    personality
  )
}
