'use server'
import { createCookieUserId } from "@/utils/auth/cookies";
import { loginUserBackend } from "@/utils/auth/userBackend"


export const handleLogin = async (id: string |undefined , name: string | undefined | null) => {
    try {
        const data = await loginUserBackend(id, name);
        if(data){
            const cookie = await createCookieUserId(data);
            if(cookie === true){
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (err: any) {
        console.error(err.message)
        return {equivocacion: err.message}
    }
}

// export const handleLogout = async () => {
//     try {
//         const success = await deleteCookie();
//         if(success === true){
//             return true;
//         }
//     } catch (error) {
//         console.error(error)
//     }
// }