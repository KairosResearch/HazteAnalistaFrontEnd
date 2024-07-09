'use client';
import { getLessonsByUser } from "@/services/backend/lessons";


export const getLastElement = async () => {
    if (
        typeof window !== undefined &&
        window.localStorage.getItem("guzma") !== null
      ) {
        const guzma = Number(window.localStorage.getItem("guzma"));
        const isFinalizado = await getLessonsByUser(guzma)

        if (isFinalizado && isFinalizado.length > 0) {
            const ultimoElemento = isFinalizado[isFinalizado.length - 1];
            console.log("Último elemento:", ultimoElemento);
            const{ id_leccion, id_modulo} = ultimoElemento;
            const currentLessonId = id_leccion + 1;
            
            const currentModuleId = id_leccion === 6 || id_leccion === 11 ? id_modulo + 1 : id_modulo;

            return {currentLessonId, currentModuleId}
        }   
      } else {
        console.log('Logueate')
        }
}
