'use server';

import { postLogin, postRegister } from "@/services/backend/login";


export const loginUserBackend = async (privyId: string | undefined, name: string | undefined | null) => {
    try {

        const userToBack = {
            id_user_privy: privyId,
            wallet: name
        }
        console.log('Usuario a guardar en backend:  ' , userToBack)

        const data = await postLogin(userToBack);

        console.log('Usuario logeado, su id es: ', data.id_usuario)
        return data.id_usuario;
        

        
    } catch (error) {
        throw new Error('Error al guardar el usuario en la base de datos')
    }

}
export const registerUserBackend = async (privyId: string | undefined, name: string | undefined | null) => {
    try {

        const userToBack = {
            id_user_privy: privyId,
            wallet: name
        }
        console.log('Usuario a guardar en backend:  ' , userToBack)

        const data = await postRegister(userToBack);
        console.log('Data del registro en backend:  ' , data)
        

        if(typeof data === 'number'){
            return data.toLocaleString();
        } else {
            const {user} = data;
            const {id} = user;
            return id;
        }
       
        //Destructurando el id
       
        
    } catch (error) {
        throw new Error('Error al guardar el usuario en la base de datos')
    }

}
