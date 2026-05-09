import { Button } from "@/components/ui/button"

type Props = {
  onClear: () => void
}

export function ChatHeader({ onClear }: Props) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">FuckAI</h1>

        <p className="mt-1 text-sm text-muted-foreground">Powered by Gemini</p>
      </div>

      <Button variant="outline" onClick={onClear}>
        Clear Chat
      </Button>
    </div>
  )
}
