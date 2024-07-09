'use client'
import React, { useEffect } from "react";
// import { getLastElement } from "@/utils/lessons/ultimoElemento";
import { AllModules, LessonProps } from "@/index";
import { getLastElement } from "@/utils/lessons/ultimoElemento";

type Props = {
  allModules: AllModules | undefined;
};

const CurrentModule = ({allModules}: Props) => {
  const [modules, setModules] = React.useState<any[]>([]);
  const [lastLesson, setLastLesson] = React.useState<number>(0);

  useEffect(() => {
    const getModules = async () => {
      
        const { currentModuleId, id_leccion } = (await getLastElement()) as {
          currentModuleId: number;
          id_leccion: number;
        };
        setLastLesson(id_leccion);
        if(allModules != undefined){
          
            if(currentModuleId === 2){
            
              setModules([allModules["Módulo 1"], allModules["Módulo 2"]]);
            } else if(currentModuleId === 3){
            
              setModules([allModules]);
            } else {
              
              setModules([allModules["Módulo 1"]]);
            }
        }
  
        
  }
  getModules();
  }, []);

  console.log(modules)
  

  return (
    <>
      {modules.map((mod, i) => (
        <div role="row" key={i}>
          <h1 className="text-2xl mb-6">Modulo</h1>
          <section className="grid grid-cols-1 px-4 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mod.map((lesson: LessonProps) => (
              <div key={lesson.id}>
                <h2>{lesson.leccion}</h2>
                <p>{lesson.numero_leccion}</p>
                <p>Modulo {lesson.id_modulo}</p>
                {(lesson.id <= lastLesson) ? <p>Completado</p> : <p>Pendiente</p>}
              </div>
            
            ))}
          </section>
        </div>
      ))}
      
    </>
  );
};

export default CurrentModule;
