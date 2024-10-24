"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { CgSpinner } from "react-icons/cg";
import { Button } from "@/components/ui/button";
import { error, success } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import Link from "next/link";

const OnBoardingForm = ({ session }: { session: Session }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>("");

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const res = await fetch("/api/auth/onboarding", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email: session?.user?.email }),
    }).then((res) => res.json());
    setIsLoading(false);

    if (!res.ok) {
      return error(res.error);
    }

    success(res.message);
    router.push("/");
  }

  return (
    <div className="mb-4">
      <div className="flex flex-col space-y-2 text-center mb-4">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome</h1>
        <p className="text-sm text-muted-foreground">Please enter your details</p>
      </div>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="" htmlFor="name">
              Full Name
            </Label>
            <Input
              id="name"
              placeholder="John Doe"
              type="text"
              value={session?.user?.name || name}
              onChange={(e) => setName(e.target.value)}
              autoCapitalize="on"
              autoComplete="name"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              value={session?.user?.email ?? ""}
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              disabled
            />
          </div>

          <Button className="mt-2" disabled={name === "" || isLoading}>
            {isLoading && <CgSpinner className="mr-2 h-4 w-4 animate-spin" />}
            Continue
          </Button>
        </div>
      </form>
      <p className="px-8 text-center text-xs text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <Link href="#" className="underline underline-offset-4 hover:text-primary">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="#" className="underline underline-offset-4 hover:text-primary">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
};

export default OnBoardingForm;
