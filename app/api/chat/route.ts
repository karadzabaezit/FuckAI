// import { GoogleGenAI } from "@google/genai"
import { NextResponse } from "next/server"
import OpenAI from "openai"
import { SYSTEM_INSTRUCTION } from "./config"

// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY!,
// })

// export async function POST(req: Request) {
//   try {
//     const body = await req.json()

//     const interaction = await ai.interactions.create({
//       model: "gemini-2.5-flash-lite",
//       input: body.message,
//       previous_interaction_id: body.previousInteractionId ?? undefined,
//       system_instruction: SYSTEM_INSTRUCTION,
//     })

//     // @ts-expect-error Gemini typings are drunk
//     const text = interaction.steps?.at(-1)?.content?.[0]?.text || ""
//     return NextResponse.json({
//       text,
//       interactionId: interaction.id,
//     })
//   } catch (error: unknown) {
//     console.error(error)

//     let status = 500
//     let message = "Something exploded."

//     if (typeof error === "object" && error !== null) {
//       if ("status" in error) {
//         status = Number(error.status)
//       }
//       if ("message" in error) {
//         message = String(error.message)
//       }
//     }

//     return NextResponse.json(
//       {
//         error: {
//           message,
//         },
//       },
//       {
//         status,
//       }
//     )
//   }
// }

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
      ...(body.messages || []).map(
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

    const completion = await client.chat.completions.create({
      model: "inclusionai/ring-2.6-1t:free",
      messages,
    })

    const response = completion.choices[0].message

    return NextResponse.json({
      text: response.content || "",
      // @ts-expect-error openrouter typings moment
      reasoningDetails: response.reasoning_details,
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
