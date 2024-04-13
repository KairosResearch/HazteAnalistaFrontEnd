'use server';
import { cookies } from "next/headers";
import { logout } from "@/services/backend/login";


export const handleLogout = async () => {
    const cookiesStore = cookies();
    const accessToken = cookiesStore.get('accessToken')?.value;

    const loggedOut = await logout(accessToken as string);
    if (loggedOut){
        cookiesStore.delete('accessToken');
        return true;
    }
    return false;
}    