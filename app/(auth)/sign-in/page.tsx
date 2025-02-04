import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SignInForm from "./SignInForm";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Quiz App - Sign in",
};

export default async function AuthenticationPage() {
  const session = await auth();
  if (session) return redirect("/");
  return <SignInForm />;
}
