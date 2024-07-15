import { create } from "zustand";

import { AuthLoadingStatusProps } from "@/index";


export const useAuthLoadingStatus = create<AuthLoadingStatusProps>((set) => ({
  isLoading: false,
  setIsLoading: (newState: boolean) => set({ isLoading: newState }),
}));

