'use server';

import { updateNote, getNote } from "@/services/backend/notes";

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

export const handleGetNote = async (guzma: number, id: number) => {
    try {
        const res = await getNote(guzma, id);
        if (res) {
            return res[0].notas;
        }
    } catch (error) {
        console.error(error);
    }
}