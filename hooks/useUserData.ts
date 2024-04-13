
import { create } from 'zustand'


type UserData = {
    userId: number | null;
    setUserId: (newId: number) => void;
    accessToken: string | undefined;
    setAccessToken: (newAccessToken: string | undefined) => void;
};
type UserTableData = {
    userTableData: [];
    setUserTableData: (newData: any) => void;
}

export const useUserData = create<UserData>((set) => ({
    userId: null,
    setUserId: (newId: number) => set({ userId: newId }),
    accessToken: undefined,
    setAccessToken: (newAccessToken: string | undefined) => set({ accessToken: newAccessToken }),
}));

export const useUserTableData = create<UserTableData>((set) => ({
    userTableData: [],
    setUserTableData: (newData: any) => set({ userTableData: newData }),
}));
