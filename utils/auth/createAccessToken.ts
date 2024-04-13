import { postLogin } from "@/services/backend/login"
import { cookies } from "next/headers"

export const createAccessToken = async (formData: any) => {
    const cookiesStore = cookies()
    const data = await postLogin(formData)
    const { access_token, expires_at } = data;
    console.log('access_token', access_token)
    console.log('expires_at', expires_at)

    if (access_token) {
        cookiesStore.set('accessToken', access_token, {
            path: '/',
            expires: new Date(expires_at),
            sameSite: 'strict',
        })
    }
    return data;

}