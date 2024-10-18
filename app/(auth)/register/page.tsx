import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import RegisterForm from "./RegisterForm";

export const metadata: Metadata = {
  title: "Register",
  description: "Quiz App - Register",
};

export default async function AuthenticationPage() {
  const session = await auth();
  if (session) return redirect("/");
  return <RegisterForm />;
}
