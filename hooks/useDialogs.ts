import { create } from 'zustand'


import {DialogHookProps} from '@/index'

export const useDialogItem = create<DialogHookProps>((set) => ({
    isOpen: false,
    setIsOpen: (newState: boolean) => set({ isOpen: newState }),
    mode: "none",
    setMode: (newMode: 'add' |'edit' | 'none' ) => set({ mode: newMode }) 
}));

