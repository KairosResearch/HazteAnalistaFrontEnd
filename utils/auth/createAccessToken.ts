import { cookies } from "next/headers"

const cookiesStore = cookies()

export const createAccessToken = async (user: any) => {
    
    console.log('Usuario como objeto:  ' , {user});
    const userSring = JSON.stringify(user);
    console.log('Usuario como string:  ' + userSring)
    

    if (user != null) {
        try {
            cookiesStore.set('userObj', userSring, {
                path: '/',
                sameSite: 'strict',
            })
            return true;
        } catch (err) {
            throw new Error('No se pudo guardar la cookie');
        }
        
    }
    return null;
}

export const deleteCookie = async () => {
    try {
        cookiesStore.delete('userObj')
        return true;
    } catch (error) {
        console.error(error)
    }
}