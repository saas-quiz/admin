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
        <div className="relative min-h-screen flex-col items-center justify-center grid lg:grid-cols-2 lg:px-0">
          <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
            <div className="absolute inset-0 bg-zinc-900" />
            <div className="relative z-20 flex items-center text-lg font-medium">
              <SiPlatformdotsh className="mr-5" />
              Quiz App
            </div>
            <div className="relative z-20 mt-auto">
              <blockquote className="space-y-2">
                <p className="text-lg">
                  &ldquo;This is the introduction paragraph. It should be at least 150 characters long&rdquo;
                </p>
                <footer className="text-sm">Sandeep Kumar</footer>
              </blockquote>
            </div>
          </div>

          <div className="p-2">
            <div className="mx-auto flex w-full flex-col justify-center md:w-[450px]">
              {children}
              <p className="px-8 text-center text-sm text-muted-foreground">
                By clicking continue, you agree to our{" "}
                <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>

        <Toaster />
      </body>
    </html>
  );
}
