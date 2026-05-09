import { Button } from "@/components/ui/button"

type Props = {
  onClear: () => void
}

export function ChatHeader({ onClear }: Props) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">FuckAI</h1>

          <span className="rounded-full border px-2 py-0.5 text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
            Alpha
          </span>
        </div>

        <a
          href="https://github.com/karadzabayezit/FuckAI"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 block text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          GitHub
        </a>
      </div>

      <Button variant="outline" onClick={onClear}>
        Clear Chat
      </Button>
    </div>
  )
}
