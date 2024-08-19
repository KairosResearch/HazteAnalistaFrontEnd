import { create } from "zustand";

import { ComparativeInfoProps } from "@/index";
import { ComparativeInfo } from "@/index";
// import { DialogInstrHookProps } from "@/index";

export const useComparativeTokens = create<ComparativeInfoProps>((set) => ({
    comparativeInfo: [],
    setComparativeInfo: (newState: ComparativeInfo[]) => set({ comparativeInfo: newState }),
    token1: '',
    setToken1: (newState: string) => set({ token1: newState }),
    token2: '',
    setToken2: (newState: string) => set({ token2: newState }),
    loading: false,
    setLoading: (newState: boolean) => set({ loading: newState }),
 
}));


