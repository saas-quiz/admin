"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import OnBoarding from "./on-boarding";
import SignInForm from "./signin-form";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface FormProps {
  changeState: React.Dispatch<
    React.SetStateAction<{
      element: "SIGNIN_FORM" | "ON_BOARDING_FORM";
      data?: any;
    }>
  >;
}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [currentState, setCurrentState] = React.useState<{
    element: "SIGNIN_FORM" | "ON_BOARDING_FORM";
    data?: any;
  }>({ element: "SIGNIN_FORM" });

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {currentState.element === "SIGNIN_FORM" && <SignInForm changeState={setCurrentState} />}
      {currentState.element === "ON_BOARDING_FORM" && <OnBoarding data={currentState.data} />}
    </div>
  );
}
