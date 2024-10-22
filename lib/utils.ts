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
export const fetcherOpt = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  // revalidateOnMount: false,
};

export const error = (msg: string, duration?: number, noTitle?: boolean) =>
  toast({ title: noTitle ? "" : "Error", description: msg, variant: "destructive", duration: duration || 3000 });
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

export const uploadImageAPI = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/image", { method: "POST", body: formData });
  return await response.json();
};

export const exitFullScreen = () => {
  try {
    if (document) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        // @ts-ignore
      } else if (document.mozCancelFullScreen) {
        // @ts-ignore // Firefox
        document.mozCancelFullScreen();
        // @ts-ignore
      } else if (document.webkitExitFullscreen) {
        // @ts-ignore // Chrome, Safari, Opera
        document.webkitExitFullscreen();
        // @ts-ignore
      } else if (document.msExitFullscreen) {
        // @ts-ignore // IE/Edge
        document.msExitFullscreen();
      }
    }
  } catch (error: any) {}
};

export const enterFullScreen = () => {
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
    // @ts-ignore
  } else if (elem.mozRequestFullScreen) {
    // @ts-ignore // Firefox
    elem.mozRequestFullScreen();
    // @ts-ignore
  } else if (elem.webkitRequestFullscreen) {
    // @ts-ignore // Chrome, Safari, Opera
    elem.webkitRequestFullscreen();
    // @ts-ignore
  } else if (elem.msRequestFullscreen) {
    // @ts-ignore // IE/Edge
    elem.msRequestFullscreen();
  }
};
