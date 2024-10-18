"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { error, success } from "@/lib/utils";
import React from "react";
import { CgEye, CgSpinner } from "react-icons/cg";
import { FcGoogle } from "react-icons/fc";
import { EyeNoneIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

const RegisterForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [showPassword, setShowPassword] = React.useState(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    }).then((res) => res.json());
    setIsLoading(false);

    if (!res.ok) return error(res.error);

    success(res.message);
    router.push("/sign-in");
  }

  return (
    <>
      <div className="flex flex-col space-y-2 text-center py-5">
        <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
        <p className="text-sm text-muted-foreground">Enter your details below to register</p>
      </div>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="font-normal" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              placeholder="name@example.com"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="font-normal" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Label className="font-normal" htmlFor="password">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              placeholder="********"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
            />
            <span
              className="absolute right-2 top-1/2 -translate-y-1/2"
              role="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <CgEye /> : <EyeNoneIcon />}
            </span>
          </div>
          <Button disabled={email === "" || password === "" || isLoading} className="mt-2">
            {isLoading && <CgSpinner className="mr-2 h-4 w-4 animate-spin" />}
            Continue
          </Button>
        </div>
      </form>
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={() => {
          const res = signIn("google");
          console.log(res);
        }}
      >
        {isLoading ? <CgSpinner className="mr-2 h-4 w-4 animate-spin" /> : <FcGoogle className="mr-2 h-4 w-4" />} Google
      </Button>

      <div className="text-center text-[16px] my-2">
        <span className="text-muted-foreground">Already have an account?</span>{" "}
        <Link href="/sign-in" className="underline font-medium">
          Sign In
        </Link>
      </div>
    </>
  );
};

export default RegisterForm;
