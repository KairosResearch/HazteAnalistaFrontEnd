import React from 'react'
import { getLastElement } from '@/utils/lessons/ultimoElemento'
import {separatedCombinedModules} from '@/utils/lessons/separateModules'
import { ModulesProps } from '@/index';

const CurrentModule = async () => {  
    const {currentModuleId} = await getLastElement() as {currentModuleId: number; };
    const arrayModulos = await separatedCombinedModules(currentModuleId) as ModulesProps[];
    
    
  return (
    <>
      {arrayModulos.map((mod) => 
        <div role="row" key={i}>
            <h1 className="text-2xl mb-6">Modulo {mod.modulo}</h1>
            <section className="grid grid-cols-1 px-4 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {aprendizaje.lessons.map((leccion, i) => {
                const { html, ...leccionSinHtml } = leccion;
                const lessonItemsToShow = { ...leccionSinHtml, link: `/lessons/${leccion?.id}` };
                return <LessonsCard key={i} lesson={lessonItemsToShow} />;  
            })}
            </section>
        </div>
      )}
    </>
  )
}

export default CurrentModule