"use client";

import Link from "next/link";

import {
  ArrowRight,
  Brain,
  Flame,
  MessageSquare,
  ShieldOff,
  Sparkles,
} from "lucide-react";

import { motion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { Header } from "@/components/layout/Header";
import {
  TypographyH1,
  TypographyH2,
  TypographyLead,
  TypographyMuted,
  TypographyP,
} from "@/components/ui/typography";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(8px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",

    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const stagger = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function HomePage() {
  return (
    <main className="relative z-10 overflow-hidden text-foreground">
      <ScrollArea className="h-dvh">
        <div className="relative z-30 mx-auto flex max-w-6xl flex-col px-6">
          <Header showChatButton />

          <motion.section
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex min-h-[70vh] flex-col items-center justify-start py-30 text-center"
          >
            <motion.div variants={fadeUp}>
              <Badge
                variant="secondary"
                className="mb-6 rounded-full border bg-background/60 px-4 py-2 text-sm backdrop-blur-xl"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Personality-first AI chat
              </Badge>
            </motion.div>

            <motion.div variants={fadeUp}>
              <TypographyH1 className="max-w-5xl text-center text-5xl font-black sm:text-7xl">
                AI with personality.
                <br />
                Not corporate therapy.
              </TypographyH1>
            </motion.div>

            <motion.div variants={fadeUp}>
              <TypographyLead className="mt-8 max-w-2xl text-center">
                FuckAI is an experimental AI chat experience with distinct
                personalities, sharp conversations, model fallback, and zero
                fake-positive corporate assistant energy.
              </TypographyLead>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
            >
              <motion.div
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.98,
                }}
              >
                <Link href="/chat">
                  <Button
                    size="lg"
                    className="h-14 rounded-full px-8 text-base"
                  >
                    Start chatting
                    <motion.div
                      animate={{
                        x: [0, 4, 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "easeInOut" as const,
                      }}
                    >
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </motion.div>
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.98,
                }}
              >
                <a
                  href="https://github.com/karadzabaezit/FuckAI"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 rounded-full px-8 text-base"
                  >
                    View GitHub
                  </Button>
                </a>
              </motion.div>
            </motion.div>
          </motion.section>

          {/* FEATURES */}

          <section className="pb-40">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mb-16 text-center"
            >
              <Badge variant="outline" className="mb-4 rounded-full">
                Features
              </Badge>

              <TypographyH2>
                Actually different from generic AI wrappers
              </TypographyH2>

              <TypographyLead className="mx-auto mt-6 max-w-2xl">
                Built to feel like a real conversational product — not another
                empty chatbot clone.
              </TypographyLead>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid gap-6 md:grid-cols-3"
            >
              <FeatureCard
                icon={<MessageSquare className="h-5 w-5" />}
                title="Real personalities"
                description="Different AI personalities with distinct reasoning, tone, and behavior instead of generic assistant slop."
              />

              <FeatureCard
                icon={<Brain className="h-5 w-5" />}
                title="Actually engaging"
                description="Conversations that feel sharp, human, and entertaining instead of sterile assistant responses."
              />

              <FeatureCard
                icon={<ShieldOff className="h-5 w-5" />}
                title="No fake positivity"
                description="The AI can disagree with you, roast bad ideas, and avoid sounding like HR wrote every response."
              />
            </motion.div>
          </section>

          <motion.section
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
            }}
            className="pb-40"
          >
            <Card className="rounded-[32px] border bg-background/80">
              <CardContent className="p-8 sm:p-12">
                <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
                  <div className="max-w-2xl">
                    <Badge variant="outline" className="mb-4 rounded-full">
                      <Flame className="mr-2 h-3.5 w-3.5" />
                      Experimental
                    </Badge>

                    <TypographyH2 className="text-3xl sm:text-5xl">
                      Built for people tired of generic AI wrappers.
                    </TypographyH2>

                    <TypographyP className="mt-6 text-lg leading-8">
                      No productivity cult. No motivational LinkedIn energy.
                      Just fast AI conversations with actual personality.
                    </TypographyP>
                  </div>

                  <motion.div
                    whileHover={{
                      scale: 1.03,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    className="flex flex-col gap-4"
                  >
                    <Link href="/chat">
                      <Button
                        size="lg"
                        className="h-14 rounded-full px-8 text-base"
                      >
                        Enter chat
                      </Button>
                    </Link>

                    <TypographyMuted>Currently in alpha.</TypographyMuted>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          <Separator className="mb-6" />

          {/* FOOTER */}

          <motion.footer
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{ once: true }}
            className="flex items-center justify-between pb-10"
          >
            <TypographyMuted>FuckAI © 2026</TypographyMuted>

            <TypographyMuted>Built with OpenRouter + Next.js</TypographyMuted>
          </motion.footer>
        </div>
      </ScrollArea>
    </main>
  );
}

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{
        y: -6,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <Card className="rounded-[28px] border bg-background/80 transition-all duration-300 hover:border-foreground/20">
        <CardHeader>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border bg-background/60 text-muted-foreground">
            {icon}
          </div>

          <CardTitle className="pt-2 text-lg tracking-tight">{title}</CardTitle>
        </CardHeader>

        <CardContent>
          <TypographyP>{description}</TypographyP>
        </CardContent>
      </Card>
    </motion.div>
  );
}
