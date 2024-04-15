import { AUTH_URL } from "./urls"

export const getUserData = async (accessToken: string) => {
    try{
        const response = await fetch(`${AUTH_URL}user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        //Cualquier error en la respuesta del servidor manda null
        if(response.ok){
            const data = await response.json()
            return data;
        } else {
            return null;
        }
        
    } catch (err: any) {
        console.error(err.message)
        return {error: err.message}
    }
}

