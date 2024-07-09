'use server';

import { saveLesson } from "@/services/backend/lessons";

export const saveLessonAction = async (guzma: number, mod: number, less: number) => {
  try {
    const response = await saveLesson(
        {
            id_usuario: guzma,
            id_modulo: mod,
            id_leccion: less,
            status: 1,
        }
    );
    return response;
  } catch (err) {
    console.error(err);
  }
};