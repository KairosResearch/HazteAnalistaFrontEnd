import { AUTH_URL } from "./urls";

export const getProyects = async (id: any) => {
    try{
        const response = await fetch(`${AUTH_URL}getProyectosSegUsuario/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 
            },

        })
        const data = await response.json();
        return data
    } catch (err: any) {
        console.error(err.message)
        return {error: err.message}
    }
}


export const postProyect = async ( proyectData: any) => {
    try{
        const response = await fetch(`${AUTH_URL}saveProyectSegmto`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(proyectData)
        })
        const data = await response.json()
        return data
    } catch (err) {
        console.error('error en postProyect: ', err)
    }
}

export const deleteProyect = async ( idBody: any) => {
    try{
        const response = await fetch(`${AUTH_URL}delteProject`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify(idBody)
        })
        const data = await response.json()
        return data
    } catch (err) {
        console.error('error en deleteProyect: ', err)
    }
}

export const updateProyect = async ( proyectData: any) => {
    try{
        const response = await fetch(`${AUTH_URL}update_project`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(proyectData)
        })
        const data = await response.json()
        return data
    } catch (err) {
        console.error('error en updateProyect: ', err)
    }
}