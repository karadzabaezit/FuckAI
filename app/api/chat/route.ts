import { GoogleGenAI } from "@google/genai"
import { NextResponse } from "next/server"

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
})

export async function POST(req: Request) {
  const { message } = await req.json()

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: message,
  })

  return NextResponse.json({
    text: response.text,
  })
}
