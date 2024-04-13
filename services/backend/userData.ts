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
        const data = await response.json()
        return data
    } catch (err) {
        console.error(err)
    }
}

