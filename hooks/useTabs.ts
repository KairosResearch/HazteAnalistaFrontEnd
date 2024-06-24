import { create } from 'zustand'


import {TabsHookProps} from '@/index'

export const useTabsState = create<TabsHookProps>((set) => ({
    isReadyNextTab: false,
    setIsReadyNextTab: (newState: boolean) => set({ isReadyNextTab: newState })
}));

