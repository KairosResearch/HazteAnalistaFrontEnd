'use server'
import { postProyect, getProyects, deleteProyect, updateProyect } from "@/services/backend/proyects";
import { cookies } from "next/headers";

function valuesFromCookies() {
    const cookiesStore = cookies();
    const accessToken = cookiesStore.get('accessToken')?.value as string;
    const userString = cookiesStore.get('user')?.value;
    const userObject = userString ? JSON.parse(userString) : {id: 2};
    const {id} = userObject;
    return {accessToken, id}
}


export const handleGetProyects = async () => {
    try {
        const {accessToken, id} = valuesFromCookies();
        const data = await getProyects(accessToken, id)
        if (data.error) {
            return {error: data.error}
        }
        console.log('Hanlde get proyects')
        return data;
    } catch (err: any) {
        console.error(err.message)
    }
}

export const handleSubmitProyectForm = async (formData: any) => {
    try {
        const {accessToken, id} = valuesFromCookies();
        const posted = await postProyect(accessToken, {...formData, idUsuario: id})
        console.log(posted)
        if (posted) {
            const newData = await handleGetProyects();
            console.log('Nueva Data dentro del backend', newData)
            return newData;
        }
    } catch (err) {
        console.error(err)
    }
}

export const handleDeleteProyect = async (id_proyecto: number | null) => {
    try {
        const {accessToken} = valuesFromCookies();
        const deleted = await deleteProyect(accessToken, id_proyecto as number);
        // if (deleted) {
        //     const newData = await getProyects(accessToken, userId)
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
        const {accessToken} = valuesFromCookies();
        console.log('formData', formData)
        const updated = await updateProyect(accessToken, formData);
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