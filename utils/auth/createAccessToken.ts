import { postLogin } from "@/services/backend/login"
import { cookies } from "next/headers"

export const createAccessToken = async (formData: any) => {
    const cookiesStore = cookies()
    const data = await postLogin(formData);

    //Si el servidor no responde o está apagado
    if(!data){
        throw new Error('Servidor no responde!')
    }

    if(data.message === 'Unauthorized'){
        throw new Error('Credenciales inválidas')
    }

    //Destructurar el objeto data para obtener el access_token y expires_at
    const { access_token, expires_at } = data;

    if (access_token) {
        try {
            cookiesStore.set('accessToken', access_token, {
                path: '/',
                expires: new Date(expires_at),
                sameSite: 'strict',
            })
        } catch (err) {
            throw new Error('No se pudo guardar la cookie');
        }
        
    }
    return data;

}