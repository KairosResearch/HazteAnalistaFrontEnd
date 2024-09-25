'use server';

import { updateNote } from "@/services/backend/notes";

export const handleUpdateNote = async (guzma: number, id: number, note: string ) => {
    try {
        const body = {
            idUsuario: guzma,
            idProyecto: id,
            nota: note
        }
        console.log(body);
        const res = await updateNote(body);
        if (res) {
            console.log(res)
            return res[0].notas;
        }
    } catch (error) {
        console.error(error);
    }
}