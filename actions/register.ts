'use server';
import { postRegister } from "@/services/backend/login";
import { createCookieUserId } from "@/utils/auth/cookies";
import { registerUserBackend } from "@/utils/auth/userBackend"
import { string } from "zod";

export const handleRegister = async (id: string |undefined , name: string | undefined | null) => {
    try {
        const data = await registerUserBackend(id, name);
        console.log('Data del registro en backend:  ' , data)
        //Si existe error de servidor
        if(typeof data === 'number'){
            const cookie = await createCookieUserId(data);
            
            if(cookie === true){
                return true;
            } else {
                return false;
            }
        }
        //Sí mmando un error el servidor, recibimos el status como string
        else {
            return data as string | undefined;
        }
    } catch (err: any) {
        console.error(err.message)
        return {equivocacion: err.message}
    }
}