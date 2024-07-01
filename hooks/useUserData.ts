import { create } from "zustand";

import { UserData, UserTableData } from "@/index";

export const useUserData = create<UserData>((set) => ({
  userId: null,
  setUserId: (newId: number) => set({ userId: newId }),
}));

export const useUserTableData = create<UserTableData>((set) => ({
  userTableData: [],
  setUserTableData: (newData: any) => set({ userTableData: newData }),
}));
