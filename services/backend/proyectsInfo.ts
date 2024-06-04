import { AUTH_URL } from "./urls";


export const getProjectsList = async () => {
    try{
        const response = await fetch(`${AUTH_URL}getProyectos`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        return data
    } catch (err: any) {
        console.error(err.message)
        return {error: err.message}
    }
}


export const getProyectNumbers = async (symbol: string) => {
    try{
        const response = await fetch(`${AUTH_URL}getProyecto/${symbol}/USD/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'force-cache'
        })
        const data = await response.json();
        console.log(data)
        return data
    } catch (err: any) {
        console.error(err.message)
        return {error: err.message}
    }
}

export const getProyectById = async (id: number) => {
    try{
        const response = await fetch(`${AUTH_URL}getInfoProyecto/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        const dataArray = await data.proyectosInfo;
        const info = await dataArray[0];
        return info;
    } catch (err: any) {
        console.error(err.message)
        return {error: err.message}
    }
}