import { TypeAnimation } from "react-type-animation"

import ReactMarkdown from "react-markdown"

import remarkGfm from "remark-gfm"

import rehypeHighlight from "rehype-highlight"

import { Message } from "./types"

type Props = {
  message: Message

  isLast: boolean

  isTyping: boolean

  onTypingEnd: () => void
}

export function ChatMessage({ message, isLast, isTyping, onTypingEnd }: Props) {
  const isUser = message.role === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`group relative max-w-[90%] rounded-3xl px-4 py-3 text-[15px] leading-7 shadow-sm transition-all md:max-w-[75%] ${
          isUser
            ? "border bg-foreground text-background"
            : "border bg-muted/40 text-foreground backdrop-blur-sm"
        }`}
      >
        {message.role === "assistant" && isLast && isTyping ? (
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
          <div className="prose prose-neutral dark:prose-invert prose-p:my-2 prose-pre:rounded-2xl prose-pre:border prose-pre:bg-black/40 prose-code:before:hidden prose-code:after:hidden max-w-none wrap-break-word whitespace-pre-wrap">
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
