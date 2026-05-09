# FuckAI

A chaotic AI chat built with Next.js, Gemini, and questionable life decisions.

The assistant talks like a sarcastic but helpful friend from Discord:

- roasts your mistakes
- answers shortly
- uses internet humor
- occasionally swears
- still somehow useful

---

## Stack

- Next.js 15
- React 19
- TypeScript
- TailwindCSS
- shadcn/ui
- Gemini API
- Axios
- React Markdown
- TypeAnimation

---

## Features

- AI chat with Gemini
- Interaction memory
- Local chat persistence
- Markdown rendering
- Code highlighting
- Typing animation
- Clean component architecture
- Sarcastic personality system prompt

---

## Installation

Clone the repo:

```bash
git clone https://github.com/karadzabayezit/FuckAI.git
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create:

```txt
.env.local
```

Add your Gemini API key:

```env
GEMINI_API_KEY=your_api_key_here
```

Get your key from:

[https://aistudio.google.com/apikey](https://aistudio.google.com/apikey)

---

## Run Development Server

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

---

## Project Structure

```txt
src/
├── app/
│   ├── api/chat/
│   └── page.tsx
│
├── components/chat/
│   ├── ChatHeader.tsx
│   ├── ChatInput.tsx
│   ├── ChatLayout.tsx
│   ├── ChatMessage.tsx
│   ├── ChatMessages.tsx
│   └── types.ts
│
├── hooks/
│   ├── useChat.ts
│   └── useChatStorage.ts
│
├── lib/
│   ├── chatAPI.ts
│   
```

---

## Security

Your Gemini API key is never exposed to the client.

Architecture:

```txt
Client
↓
Next.js API Route
↓
Gemini API
```

If you put your API key in frontend code, congratulations: some random dude will mine your quota in 14 minutes.

---

## Deployment

Recommended:

- Vercel

Add environment variable in:

```txt
Project Settings → Environment Variables
```

---

## License

MIT

Use it responsibly, ай брат.

