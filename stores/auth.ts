import { IUser } from "@/types";
import { create } from "zustand";

interface IAuthStore {
  user: IUser | null;
  setUser: (user: any) => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  user: null,
  setUser: (user: IUser) => set({ user }),
}));
