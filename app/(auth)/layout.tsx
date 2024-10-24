import type { Metadata } from "next";
import Fonts from "../fonts/outfit";
import { Toaster } from "@/components/ui/toaster";
import { SiPlatformdotsh } from "react-icons/si";
import Link from "next/link";
import "../globals.css";

export const metadata: Metadata = {
  title: "Quiz App",
  description: "Quiz App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${Fonts.Light} ${Fonts.ExtraLight} ${Fonts.Thin} ${Fonts.Medium} ${Fonts.Regular}  ${Fonts.SemiBold} ${Fonts.Bold} ${Fonts.ExtraBold} antialiased`}
      >
        <div className="relative min-h-screen flex-col items-center grid lg:grid-cols-2 lg:px-0">
          <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
            <div className="absolute inset-0 bg-zinc-900" />
            <div className="relative z-20 flex items-center text-lg font-medium">
              <SiPlatformdotsh className="mr-5" />
              SaaS Quiz
            </div>
            <div className="relative z-20 mt-auto">
              <blockquote className="space-y-2">
                <p className="text-lg">
                  &ldquo;SaaS Quiz is your go-to platform for creating, managing, and taking quizzes with ease. Designed for
                  flexibility, our system supports everything from academic assessments to corporate training, ensuring a
                  seamless experience across industries.&rdquo;
                </p>
                <p>
                  Log in to explore a powerful set of tools tailored for quizzes, performance tracking, and collaboration.
                </p>
                <footer className="text-sm mt-5">Sandeep Kumar</footer>
              </blockquote>
            </div>
          </div>

          <div className="p-2">
            <div className="mx-auto flex w-full flex-col px-5 sm:w-[400px]">{children}</div>
          </div>
        </div>

        <Toaster />
      </body>
    </html>
  );
}
