import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ResetPasswordForm from "./ResetPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Quiz App - Forgot Password",
};

export default async function AuthenticationPage({ searchParams }: { searchParams: { token: string; email: string } }) {
  const session = await auth();
  if (session) return redirect("/");
  return <ResetPasswordForm searchParams={searchParams} />;
}
