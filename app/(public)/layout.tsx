import type { Metadata } from "next";
import Fonts from "../fonts/outfit";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Quiz App",
  description: "Quiz App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${Fonts.Light} ${Fonts.ExtraLight} ${Fonts.Thin} ${Fonts.Medium} ${Fonts.Regular}  ${Fonts.SemiBold} ${Fonts.Bold} ${Fonts.ExtraBold} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
