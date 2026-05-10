import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"

type Props = {
  value: string
  setValue: (value: string) => void
  onSend: () => void
  onClear: () => void
  disabled: boolean
  maxLength: number
}

export function ChatInput({
  value,
  setValue,
  onSend,
  onClear,
  disabled,
  maxLength,
}: Props) {
  return (
    <div className="mt-4 pb-[env(safe-area-inset-bottom)]">
      <div className="rounded-[32px] border bg-background/80 p-3 shadow-lg backdrop-blur-md">
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value.slice(0, maxLength))}
          maxLength={maxLength}
          placeholder={"Ask anything..."}
          disabled={disabled}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              onSend()
            }
          }}
          className="max-h-60 min-h-16 resize-none border-0 bg-transparent px-3 py-3 text-[16px] shadow-none focus-visible:ring-0"
        />

        <div className="mt-2 flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={onClear}
              className="h-9 rounded-full text-muted-foreground"
            >
              Clear chat
            </Button>

            <span className="text-xs text-muted-foreground">
              {value.length}/{maxLength}
            </span>
          </div>

          <Button
            onClick={onSend}
            disabled={disabled}
            size="icon"
            className="h-11 w-11 rounded-full"
          >
            <Send />
          </Button>
        </div>
      </div>
    </div>
  )
}
