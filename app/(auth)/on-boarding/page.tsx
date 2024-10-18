import React from "react";
import { redirect } from "next/navigation";
import OnBoardingForm from "./OnBoardingForm";
import { auth } from "@/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "On Boarding",
  description: "Quiz App - On Boarding",
};

const OnBoarding = async () => {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  // @ts-ignore
  if (session?.user?.isOnBoarded) {
    redirect("/");
  }

  return <OnBoardingForm session={session} />;
};

export default OnBoarding;
