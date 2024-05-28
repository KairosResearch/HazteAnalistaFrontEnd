'use server';

import { postLogin, postRegister } from "@/services/backend/login";


export const loginUserBackend = async (id: string | undefined, name: string | undefined) => {
    try {

        const userToBack = {
            id_user_privy: id,
            wallet: name
        }
        console.log('Usuario a guardar en backend:  ' , userToBack)

        const data = await postLogin(userToBack);
        console.log('Data del login en backend:  ' , data)

        const posibleMessage = data[0];
        console.log('Mensaje del backend:  ' , posibleMessage)

        if(posibleMessage === 'El usuario no exite'){
            console.log('Vamos a hacer el post de registro')
            const registration = await postRegister(userToBack);
            console.log('Data del registro en backend:  ' , registration);
            const {user} = registration;
            const {id} = user;
            return id;
        } else {
            console.log('Usuario logeado, su id es: ', data.id_usuario)
            return data.id_usuario;
        }

        
    } catch (error) {
        throw new Error('Error al guardar el usuario en la base de datos')
    }

}

