import { IGroup, IQuiz } from "@/types";
import { create } from "zustand";

interface IDataStore {
  groups: IGroup[];
  setGroups: (groups: IGroup[]) => void;
  quizes: IQuiz[];
  setQuizes: (quizes: IQuiz[]) => void;
}

export const useDataStore = create<IDataStore>((set) => ({
  groups: [],
  setGroups: (groups: IGroup[]) => set({ groups }),
  quizes: [],
  setQuizes: (quizes: IQuiz[]) => set({ quizes }),
}));
