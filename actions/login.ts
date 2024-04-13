'use server'
import { createAccessToken } from "@/utils/auth/createAccessToken"
import { validateAccessToken } from "@/utils/auth/validateAccessToken"


export const handleLogin = async (formData: any) => {


    try {
        const data = await createAccessToken(formData)
        console.log('data', data)
        if (data.message !== 'Unauthorized')  {
            const user = await validateAccessToken();
            if(user){
                return user;
            }
        }
    } catch (err) {
        console.error(err)
    }
}