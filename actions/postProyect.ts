'use server'
import { postProyect, getProyects } from "@/services/backend/proyects";
import { cookies } from "next/headers";

export const handleSubmitProyectForm = async (formData: any, userId: number | null) => {
    try {
        console.log(userId)
        const cookiesStore = cookies();
        
        const accessToken = cookiesStore.get('accessToken')?.value as string;
        console.log('accessToken en handleSubmitProyect', accessToken)
        const posted = await postProyect(accessToken, formData)
        console.log(posted)
        if (posted) {
            const newData = await getProyects(accessToken, userId)
            console.log('Nueva Data dentro del backend', newData)
            return newData;
        }
    } catch (err) {
        console.error(err)
    }
}