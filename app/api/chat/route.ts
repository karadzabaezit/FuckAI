import { GoogleGenAI } from "@google/genai"
import { NextResponse } from "next/server"
import { SYSTEM_INSTRUCTION } from "./config"

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
})

export async function POST(req: Request) {
  const body = await req.json()

  const interaction = await ai.interactions.create({
    model: "gemini-3-flash-preview",
    input: body.message,

    previous_interaction_id: body.previousInteractionId ?? undefined,
    system_instruction: SYSTEM_INSTRUCTION,
  })
  // @ts-expect-error i dont know
  const text = interaction.steps?.at(-1)?.content[0].text || ""

  return NextResponse.json({
    text,
    interactionId: interaction.id,
  })
}
