"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { CgEye, CgSpinner } from "react-icons/cg";
import { error, success } from "@/lib/utils";
import Link from "next/link";
import { EyeNoneIcon } from "@radix-ui/react-icons";
import { verifyAndResetPasswordDB } from "@/lib/actions/user.action";
import { useRouter } from "next/navigation";

const ResetPasswordForm = ({ searchParams }: { searchParams: { token: string; email: string } }) => {
  const router = useRouter();
  const { token, email } = searchParams;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      const data = await verifyAndResetPasswordDB({ token, email, password });

      if (!data.ok) {
        error(data.error!);
        return;
      }

      success("Password reset successfully");
      router.push("/sign-in");
    } catch (err: any) {
      console.log(err.message);
      error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (!token || !email)
    return (
      <div className="flex flex-col text-center py-5">
        <h1 className="text-2xl font-semibold tracking-tight">Reset Password</h1>
        <p className="text-sm text-muted-foreground">Invalid Reset Link</p>

        <Link href="/forgot-password">
          <Button className="mt-10">
            {isLoading && <CgSpinner className="mr-2 h-4 w-4 animate-spin" />} Forgot Password Again
          </Button>
        </Link>
      </div>
    );

  return (
    <>
      <div className="flex flex-col space-y-2 text-center py-5">
        <h1 className="text-2xl font-semibold tracking-tight">Reset Password</h1>
        <p className="text-sm text-muted-foreground">Enter your new password</p>
      </div>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="font-normal" htmlFor="password">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                placeholder="********"
                // type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect="off"
                disabled={isLoading}
              />
              {/* <span
                className="absolute right-2 top-1/2 -translate-y-1/2"
                role="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <CgEye /> : <EyeNoneIcon />}
              </span> */}
            </div>
          </div>
          <div className="grid gap-1">
            <Label className="font-normal" htmlFor="password">
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="confirm_password"
                name="confirm_password"
                placeholder="********"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
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
          </div>
          <Button disabled={!password || !confirmPassword || password !== confirmPassword || isLoading} className="mt-2">
            {isLoading && <CgSpinner className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Resetting..." : "Reset"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default ResetPasswordForm;
