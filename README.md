# FuckAI Alpha | AI Without Corporate Bullshit.

A chaotic AI chat built with Next.js, OpenRouter, and questionable life decisions.

The assistant behaves like a sarcastic friend:

- roasts your mistakes
- answers shortly
- uses internet humor
- occasionally swears
- still somehow helpful

---

## Preview

- sarcastic AI personality
- short chaotic responses
- markdown support
- mobile-friendly UI
- local chat persistence
- typing animation
- clean architecture
- OpenRouter integration

---

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- TailwindCSS
- shadcn/ui
- OpenRouter API
- Axios
- React Markdown
- TypeAnimation

---

## Installation

Clone the repo:

```bash
git clone YOUR_REPO_URL
```

Install dependencies:

```bash
npm install
```

---

## OpenRouter API Setup

1. Go to:

https://openrouter.ai

2. Create an account

3. Open API keys page:

https://openrouter.ai/keys

4. Generate a new API key

5. Create:

```txt
.env.local
```

6. Add:

```env
OPENROUTER_API_KEY=your_api_key_here
```

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
│   ├── api/
│   │   └── chat/
│   │       ├── route.ts
│   │       └── config.ts
│   │
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── chat/
│   │   ├── ChatHeader.tsx
│   │   ├── ChatInput.tsx
│   │   ├── ChatLayout.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── ChatMessages.tsx
│   │   └── types.ts
│   │
│   ├── providers/
│   │   └── ThemeProvider.tsx
│   │
│   └── ui/
│
├── hooks/
│   ├── useChat.ts
│   └── useChatStorage.ts
│
├── lib/
│   ├── chatAPI.ts
│   ├── constants.ts
│   └── utils.ts
```

---

## Security

Your API key is never exposed to the client.

Architecture:

```txt
Client
↓
Next.js API Route
↓
OpenRouter API
```

If you put your API key into frontend code, some random dude will farm your quota in 15 minutes.

---

## Deployment

Recommended:

- Vercel

Add environment variable:

```txt
Project Settings → Environment Variables
```

Add:

```txt
OPENROUTER_API_KEY
```

---

## License

MIT

Use responsibly, ай брат.
