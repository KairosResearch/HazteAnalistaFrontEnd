import { cookies } from "next/headers"

const cookiesStore = cookies()

export const createAccessToken = async (user: any) => {
    
    console.log(user);
    const userSring = JSON.stringify(user);
    

    if (user != null) {
        try {
            cookiesStore.set('userObj', userSring, {
                path: '/',
                sameSite: 'strict',
            })
        } catch (err) {
            throw new Error('No se pudo guardar la cookie');
        }
        
    }
    return true;

}

export const deleteCookie = async () => {
    try {
        cookiesStore.delete('userObj')
        return true;
    } catch (error) {
        console.error(error)
    }
}