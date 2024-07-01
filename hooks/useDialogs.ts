import { create } from "zustand";

import { DialogHookProps } from "@/index";
import { DialogInstrHookProps } from "@/index";

export const useDialogItem = create<DialogHookProps>((set) => ({
  isOpen: false,
  setIsOpen: (newState: boolean) => set({ isOpen: newState }),
  mode: "none",
  setMode: (newMode: "add" | "edit" | "none") => set({ mode: newMode }),
}));

export const useDialogInstructions = create<DialogInstrHookProps>((set) => ({
  isOpenInstr: false,
  setIsOpenInstr: (newState: boolean) => set({ isOpenInstr: newState }),
  defaultTab: "first-part",
  setDefaultTab(tab) {
    set({ defaultTab: tab });
  },
}));
