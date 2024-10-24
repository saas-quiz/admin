import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import FotgotPasswordForm from "./FotgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Quiz App - Forgot Password",
};

export default async function AuthenticationPage() {
  const session = await auth();
  if (session) return redirect("/");
  return <FotgotPasswordForm />;
}
