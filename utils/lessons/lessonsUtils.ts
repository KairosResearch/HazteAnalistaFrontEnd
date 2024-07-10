"use client";
import { getLessonsByUser } from "@/services/backend/lessons";
import {getGuzmaValue} from "@/utils/values"


//General function to call the service that serves the array of lessons viewed by the user
const getLessonsCompletedByUser = async () => {
  const guzma = await getGuzmaValue() || 0; // Provide a default value of 0 if guzma is undefined
  const isFinalizado = await getLessonsByUser(guzma);
    return isFinalizado;
  
}

//defining an array that contains all ids of the lessons completed

export const lessonsCompletedArray = async () => {
  console.log('Holaaaaaaaa')
  const lessonsReadByUser = await getLessonsCompletedByUser();
  console.log(lessonsReadByUser)
  let lessonsArray: number[] = []
  lessonsReadByUser.map((item: any) => {
    lessonsArray.push(item.id_leccion)
  })
  console.log(lessonsArray)
  return lessonsArray

}


//getting the last element of the array of the lessons completed to get 
//the right module to show. If the user hasn't finished a whole module, 
//cant see the rest 
export const getLastElement = async () => {
    const lessonsReadByUser =  await getLessonsCompletedByUser();
    if (lessonsReadByUser && lessonsReadByUser.length > 0) {
      const ultimoElemento = lessonsReadByUser[lessonsReadByUser.length - 1];
      console.log("Último elemento:", ultimoElemento);
      const { id_leccion, id_modulo } = ultimoElemento;
      const currentLessonId = id_leccion + 1;

      const currentModuleId =
        id_leccion === 6 || id_leccion === 11 ? id_modulo + 1 : id_modulo;

      return { currentLessonId, currentModuleId, id_leccion };
    } else {
      return { currentLessonId: 1, currentModuleId: 1, id_leccion: 0};
    }
  
};
