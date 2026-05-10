// import { GoogleGenAI } from "@google/genai"

import { NextResponse } from "next/server"

import OpenAI from "openai"

import { SYSTEM_INSTRUCTION } from "./config"

export const MODELS = [
  "openai/gpt-oss-120b:free",
  "qwen/qwen3-next-80b-a3b-instruct:free",
  "meta-llama/llama-3.3-70b-instruct:free",
  "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
  "google/lyria-3-pro-preview",
  "qwen/qwen3-coder:free",
  "inclusionai/ring-2.6-1t:free",
  "openrouter/owl-alpha",
]
const MAX_CONTEXT_MESSAGES = 10

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
})

type ChatMessage = {
  role: "user" | "assistant" | "system"
  content: string
  reasoning_details?: unknown
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const messages: ChatMessage[] = [
      {
        role: "system",
        content: SYSTEM_INSTRUCTION,
      },
      ...(body.messages || [])
        .slice(-MAX_CONTEXT_MESSAGES)
        .map(
          (message: {
            role: string
            content: string
            reasoning_details?: unknown
          }) => ({
            role: message.role as "user" | "assistant" | "system",
            content: message.content,
            reasoning_details: message.reasoning_details,
          })
        ),
    ]

    let completion: Awaited<
      ReturnType<typeof client.chat.completions.create>
    > | null = null
    let lastError: unknown = null
    let usedModel = ""
    for (const model of MODELS) {
      try {
        completion = await client.chat.completions.create({
          model,
          messages,
        })
        usedModel = model
        console.log(`Using model: ${model}`)
        break
      } catch (error) {
        console.error(`Model failed: ${model}`, error)
        lastError = error
      }
    }

    if (!completion) {
      throw lastError
    }

    const response = completion.choices[0].message

    return NextResponse.json({
      text: response.content || "",
      model: usedModel,
      reasoningDetails:
        // @ts-expect-error i dont know
        response.reasoning_details,
    })
  } catch (error: unknown) {
    console.error(error)
    let status = 500
    let message = "Что-то сдохло."
    if (typeof error === "object" && error !== null) {
      if ("status" in error) {
        status = Number(error.status)
      }
      if ("message" in error) {
        message = String(error.message)
      }
    }

    return NextResponse.json(
      {
        error: {
          message,
        },
      },
      {
        status,
      }
    )
  }
}
