import { Metadata } from "next";
import Link from "next/link";
import { SiPlatformdotsh } from "react-icons/si";
import { UserAuthForm } from "@/app/(auth)/sign-in/components/user-auth-form";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  return (
    <>
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
            <UserAuthForm />
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
    </>
  );
}
