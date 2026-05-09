"use client"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { useState } from "react"

const sendMessage = async (message: string) => {
  // const { data } = await axios.post("/api/chat", {
  //   message: message,
  // })

  console.log(message)
}

export default function Page() {
  const [value, setValue] = useState("")
  const handleButtonClick = () => {
    sendMessage(value)
  }

  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">Ai chat project</h1>
          <p>You can chat with it!</p>
          <br />
          <Field>
            <FieldLabel htmlFor="block-end-textarea">Textarea</FieldLabel>
            <InputGroup>
              <InputGroupTextarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                id="block-end-textarea"
                placeholder="Write a comment..."
              />
              <InputGroupAddon align="block-end">
                <InputGroupText>{value.length}/280</InputGroupText>
                <InputGroupButton
                  variant="default"
                  size="sm"
                  className="ml-auto"
                  onClick={handleButtonClick}
                >
                  Send
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            <FieldDescription>
              Footer positioned below the textarea.
            </FieldDescription>
          </Field>
        </div>
        <div className="font-mono text-xs text-muted-foreground">
          (Press <kbd>d</kbd> to toggle dark mode)
        </div>
      </div>
    </div>
  )
}
