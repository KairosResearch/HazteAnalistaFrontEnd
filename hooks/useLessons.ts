import useSWR from 'swr';
import { getLessonsByUser } from '../services/backend/lessons';
import { useMemo } from 'react';
import { AnyARecord } from 'dns';

// Funciones puras fuera del hook
const calculateCurrentModuleId = (lastLesson: any) => {
  const { id_leccion, id_modulo } = lastLesson || {};
  return id_leccion === 6 || id_leccion === 11 ? id_modulo + 1 : id_modulo;
};

const buildLessonsArray = (data: any) => data?.map((item: any) => item.id_leccion) || [];

export const useLessons = () => {
  const defaultReturn = {
    module: null,
    completed: [],
    lessons: [],
    isLoading: true,
    isError: null
  };
  
  if(typeof window !== "undefined") {
    const guzma = localStorage.getItem("guzma");
    if(guzma) {
      const id = parseInt(guzma);
      console.log('Id de guzma en useLessons' + id);

      const { data, error, isLoading } = useSWR(`getLecciones/${id}`, getLessonsByUser);

      // Memoización de cálculos basados en `data`
      const currentModuleId = useMemo(() => calculateCurrentModuleId(data?.[data.length - 1]), [data]);
      const lessonsArray = buildLessonsArray(data);
    
      return {
        module: currentModuleId,
        completed: lessonsArray,
        lessons: data,
        isLoading,
        isError: error
      };
    }
  }
  return defaultReturn;
 
};

