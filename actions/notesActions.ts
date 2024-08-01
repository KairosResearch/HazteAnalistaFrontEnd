'use server';

import { updateNote } from "@/services/backend/notes";

export const handleUpdateNote = async (guzma: number, note: string, id: number) => {
    try {
        const body = {
            idUsuario: guzma,
            idProyecto: id,
            nota: note
        }
        console.log(body);
        const r = await updateNote(body);
        if (r["Nota modificada correctamente¡"]) {
            return true;
        }
    } catch (error) {
        console.error(error);
    }
}