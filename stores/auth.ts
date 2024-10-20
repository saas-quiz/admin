import { IUser } from "@/types";
import { DefaultSession } from "next-auth";
import { create } from "zustand";

interface IAuthStore {
  user: IUser | null;
  setUser: (user: any) => void;
  session: DefaultSession | null;
  setSession: (session: DefaultSession) => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  user: null,
  setUser: (user: IUser) => set({ user }),
  session: null,
  setSession: (session: DefaultSession) => set({ session }),
}));
