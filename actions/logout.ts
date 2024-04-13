'use server';
import { cookies } from "next/headers";
import { logout } from "@/services/backend/login";
import { redirect } from "next/navigation";

//Fix, isnt working

export const handleLogout = async () => {
    try {
        const cookiesStore = cookies();
        const accessToken = cookiesStore.get('accessToken')?.value;
        await logout(accessToken);
        cookiesStore.delete('accessToken');
        redirect('/');
    
    }   catch (err) {
        console.error(err)
    }
}    