import { TypeAnimation } from "react-type-animation"

import ReactMarkdown from "react-markdown"
import { Message } from "./types"

import remarkGfm from "remark-gfm"

import rehypeHighlight from "rehype-highlight"

type Props = {
  message: Message
  isLast: boolean
  isTyping: boolean
  onTypingEnd: () => void
}

export function ChatMessage({ message, isLast, isTyping, onTypingEnd }: Props) {
  return (
    <div
      className={`flex ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[75%] text-[15px] leading-7 ${
          message.role === "user" ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        {message.role === "ai" && isLast && isTyping ? (
          <TypeAnimation
            sequence={[message.content, onTypingEnd]}
            speed={95}
            cursor={false}
            repeat={0}
            wrapper="span"
            style={{
              whiteSpace: "pre-wrap",
            }}
            omitDeletionAnimation
            preRenderFirstString={false}
          />
        ) : (
          <div className="whitespace-pre-wrap">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  )
}
