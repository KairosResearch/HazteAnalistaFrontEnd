'use server'
import { postProyect, getProyects, deleteProyect, updateProyect } from "@/services/backend/proyects";
import { getProyectNumbers } from "@/services/coinmarketcap/info";
import { cookies } from "next/headers";
import { TableData } from "@/index";

function valuesFromCookies() {
    const cookiesStore = cookies();
    // const accessToken = cookiesStore.get('accessToken')?.value as string;
    const userId = cookiesStore.get('userId')?.value;
    // const userObject = userString ? JSON.parse(userString) : {id: 2};
    // const {id} = userObject;
    return {userId};
}


export const handleGetProyects = async (userId: number) => {
    try {
        // const {userId} = valuesFromCookies();
        console.log('userId', userId)
        const response = await getProyects(userId)
        
        if (response.error) {
            return response.error as string;
        }

        const data: TableData[] = await Promise.all(response.proyectos.map(async (proyecto: any) => {
            const {ticker} = proyecto;
            const cleanTicker = ticker.replace('$', '');

            const b = await getProyectNumbers(cleanTicker);
            return {
                ...proyecto,
                market_cap: b.market_cap,
                price: b.price
            }
        }))
        console.log('data', data)
        return data;
    } catch (err: any) {
        console.error(err.message)
    }
}

export const handleSubmitProyectForm = async (formData: any, idUsuario: number) => {
    try {
        // const {userId} = valuesFromCookies();
        const posted = await postProyect( {...formData, idUsuario})
        console.log(posted)
        if (posted) {
            // const newData = await handleGetProyects(idUsuario);
            // console.log('Nueva Data dentro del backend', newData)
            return true;
        }
    } catch (err) {
        console.error(err)
    }
}

export const handleDeleteProyect = async (id_proyecto: number | null) => {
    try {
        const dataToPass = {
            id_proyecto: id_proyecto
        }
        const deleted = await deleteProyect(dataToPass);
        // if (deleted) {
        //     const newData = await getProyects(userId, userId)
        //     return newData;
        // }
        console.log(deleted)
        return deleted;
    } catch (err) {
        console.error(err)
    }
}

export const handleUpdateProyect = async (formData: any) => {
    try {
        
        console.log('formData', formData)
        const updated = await updateProyect(formData);
        // if (updated) {
        //     const newData = await getProyects(accessToken)
        //     return newData;
        // }
        console.log(updated)
        return updated;
    } catch (err) {
        console.error(err)
    }
}