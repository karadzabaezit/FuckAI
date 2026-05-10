import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"

import { Textarea } from "@/components/ui/textarea"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Personality = "kazakh" | "philosopher"

type Props = {
  value: string
  setValue: (value: string) => void
  onSend: () => void
  onClear: () => void
  disabled: boolean
  maxLength: number
  personality: Personality
  setPersonality: (personality: Personality) => void
}

export function ChatInput({
  value,
  setValue,
  onSend,
  onClear,
  disabled,
  maxLength,
  personality,
  setPersonality,
}: Props) {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 mx-auto max-w-4xl p-4 pb-[env(safe-area-inset-bottom)]">
      <div className="rounded-[32px] border bg-background/80 p-3 shadow-lg backdrop-blur-md">
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value.slice(0, maxLength))}
          maxLength={maxLength}
          placeholder="Ask anything..."
          disabled={disabled}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()

              onSend()
            }
          }}
          className="max-h-60 min-h-16 resize-none border-0 bg-transparent px-3 py-1 pt-3 text-[16px] shadow-none focus-visible:ring-0"
        />

        <div className="flex items-center justify-between gap-2 px-1">
          <div className="flex items-center gap-2">
            <Select
              value={personality}
              onValueChange={(value) => setPersonality(value as Personality)}
            >
              <SelectTrigger className="h-9 w-fit rounded-full border-none bg-muted/50 text-xs shadow-none">
                <SelectValue />
              </SelectTrigger>

              <SelectContent className="p-1">
                <SelectItem value="kazakh">Best friend</SelectItem>
                <SelectItem value="philosopher">Philosopher</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="ghost"
              onClick={onClear}
              className="h-9 rounded-full text-muted-foreground"
            >
              Clear
            </Button>

            <span className="hidden text-xs text-muted-foreground md:block">
              {value.length}/{maxLength}
            </span>
          </div>

          <Button
            onClick={onSend}
            disabled={disabled}
            size="icon"
            className="h-11 w-11 rounded-full"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
