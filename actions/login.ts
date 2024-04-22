'use server'
import { createAccessToken } from "@/utils/auth/createAccessToken"
import { setUserId } from "@/utils/auth/setUserId"
import { validateAccessToken } from "@/utils/auth/validateAccessToken"


export const handleLogin = async (formData: any) => {
    try {
        const data = await createAccessToken(formData)
        
        if(data){
            const user = await validateAccessToken();
            if (user) {
                setUserId(user);
                return user;
            }
        }
    } catch (err: any) {
        console.error(err.message)
        return {error: err.message}
    }
}