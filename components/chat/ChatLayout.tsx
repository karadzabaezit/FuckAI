import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export function ChatLayout({ children }: Props) {
  return (
    <div className="mx-auto flex h-dvh max-w-4xl flex-col p-4 pt-6">
      {children}
    </div>
  )
}
