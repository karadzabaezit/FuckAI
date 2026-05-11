"use client";

import Link from "next/link";

import { motion } from "motion/react";

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

import { Button } from "@/components/ui/button";

import { TypographyMuted } from "@/components/ui/typography";
import { GithubIcon } from "../icons/lucide-github";

type Props = {
  showChatButton?: boolean;
};

export function Header({ showChatButton = false }: Props) {
  return (
    <motion.header
      initial={{
        opacity: 0,
        y: -16,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="relative top-0 z-50 flex items-center justify-between py-6"
    >
      <div className="flex items-center gap-3">
        <Link href="/">
          <motion.div
            whileHover={{
              rotate: -6,
              scale: 1.05,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
            }}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border bg-background/60"
          >
            <span className="text-lg font-black">F</span>
          </motion.div>
        </Link>

        <div>
          <h1 className="text-2xl font-bold tracking-tight">FuckAI</h1>

          <TypographyMuted>AI Without Corporate Bullshit.</TypographyMuted>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        <motion.span
          whileHover={{
            scale: 1.05,

            rotate: -4,
          }}
          whileTap={{
            scale: 0.95,
          }}
          className="flex h-10 w-10 items-center justify-center"
        >
          <AnimatedThemeToggler variant="circle" className="rounded-full" />
        </motion.span>

        <motion.a
          whileHover={{
            scale: 1.05,

            rotate: -4,
          }}
          whileTap={{
            scale: 0.95,
          }}
          href="https://github.com/karadzabayezit/FuckAI"
          target="_blank"
          rel="noopener noreferrer"
          className="t flex h-10 w-10 items-center justify-center rounded-full border bg-background/60"
        >
          <GithubIcon className="h-5 w-5" />
        </motion.a>

        {showChatButton && (
          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.98,
            }}
          >
            <Link href="/chat">
              <Button className="rounded-full px-5">Open Chat</Button>
            </Link>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
