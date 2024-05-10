'use server'
import { createAccessToken } from "@/utils/auth/createAccessToken"
import { deleteCookie } from "@/utils/auth/createAccessToken"
import { redirect } from "next/navigation"


export const handleLogin = async (user: any) => {
    try {
        const data = await createAccessToken(user)
        
        if(data === true){
            redirect('/dashboard')
        }
    } catch (err: any) {
        console.error(err.message)
        return {error: err.message}
    }
}

export const handleLogout = async () => {
    try {
        const success = await deleteCookie();
        if(success === true){
            return true;
        }
    } catch (error) {
        console.error(error)
    }
}