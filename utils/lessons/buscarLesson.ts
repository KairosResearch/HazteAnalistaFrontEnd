"use server";

import { LessonProps } from "@/index";
import { separateModules } from "./separateModules";
//Function to look for the correct lesson
export const buscarLesson = async (id: number) => {
  if (id >= 1 && id <= 6) {
    const module = await separateModules(1) as LessonProps[];

    const leccion = module[id - 1];

    return leccion;
  }
  if (id >= 7 && id <= 11) {
    const module = await separateModules(2)as LessonProps[];
    const leccion = module[id - 7];
    return leccion;
  }
  if (id >= 12 && id <= 15) {
    const module = await separateModules(3)as LessonProps[];
    const leccion = module[id - 12];
    return leccion;
  }
};
