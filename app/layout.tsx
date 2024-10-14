import type { Metadata } from "next";
import Fonts from "./fonts/outfit";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
