import { AUTH_URL } from "./urls";

export const getProyects = async (accessToken: string | undefined, userId: number | null) => {
    try{
        const response = await fetch(`${AUTH_URL}getProyectos?idUsuario=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        const data = await response.json()
        return data
    } catch (err: any) {
        console.error(err.message)
        return {error: err.message}
    }
}

export const postProyect = async (accessToken: string, proyectData: any) => {
    try{
        const response = await fetch(`${AUTH_URL}saveProyectSegmto`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(proyectData)
        })
        const data = await response.json()
        return data
    } catch (err) {
        console.error(err)
    }
}
