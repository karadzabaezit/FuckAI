import { Albert_Sans, Geist_Mono } from "next/font/google";

import ParticlesWithTheme from "@/components/layout/ParticlesWithTheme";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import "./globals.css";

const albert = Albert_Sans({ subsets: ["latin"], variable: "--font-sans" });
const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});
export const metadata: Metadata = {
  metadataBase: new URL("https://fuck-ai.space"),
  title: {
    default: "FuckAI — AI Without Corporate Bullshit",
    template: "%s — FuckAI",
  },
  description:
    "Sarcastic AI assistant with humor, personality, and zero corporate bullshit.",
  keywords: [
    "AI chat",
    "AI assistant",
    "sarcastic AI",
    "funny AI",
    "AI chatbot",
    "chatgpt alternative",
    "OpenRouter AI",
    "AI with personality",
  ],
  openGraph: {
    title: "FuckAI",
    description: "AI Without Corporate Bullshit.",
    url: "https://fuck-ai.space",
    siteName: "FuckAI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "FuckAI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FuckAI",
    description: "AI Without Corporate Bullshit.",
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        albert.variable
      )}
    >
      <body>
        <ThemeProvider>
          <ParticlesWithTheme />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
