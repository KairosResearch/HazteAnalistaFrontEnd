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
        const r = await updateNote(body);
        if (r) {
            return r;
        }
    } catch (error) {
        console.error(error);
    }
}