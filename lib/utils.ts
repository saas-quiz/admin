import { toast } from "@/components/ui/use-toast";
import { clsx, type ClassValue } from "clsx";
import { ReactElement } from "react";
import { twMerge } from "tailwind-merge";
import { compareSync, hashSync } from "bcryptjs";
import jwt from "jsonwebtoken";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetcher = (url: string) => fetch(url).then((res) => res.json());
export const mutateOpt = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  revalidateOnMount: false,
};

export const error = (msg: string) => toast({ title: "Error", description: msg, variant: "destructive" });
export const success = (msg: string, type?: "success" | "default", action?: ReactElement) =>
  toast({ title: "Success", description: msg, variant: type || "default", action });

export const hashPassword = (password: string) => hashSync(password, 10);
export const comparePassword = (password: string, hash: string) => compareSync(password, hash);

export const generateTokens = (data: { id: string; email: string }, secret: string) => {
  return {
    accessToken: jwt.sign(data, secret, { expiresIn: "1h" }),
    refreshToken: jwt.sign(data, secret, { expiresIn: "7d" }),
  };
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};
