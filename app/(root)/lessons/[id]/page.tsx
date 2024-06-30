import React from 'react'
import Link from 'next/link'
//Components
import NavbarLessons  from '@/components/shared/lessons/NavbarLessons'


import { aprendizaje } from '@/lib/data'

interface PagePropsxd {
    params: {
        id: string
    }
}
const page = (
    {params}: PagePropsxd
) => {
    const numParam = parseInt(params.id);

    const buscarLeccion = () => {
        
        for(const arrayLecciones of aprendizaje){
            const leccion = arrayLecciones.lessons.find(leccion => leccion.id === numParam)
            if(leccion){
                return leccion
            }
        }
    }
     
    const leccion = buscarLeccion();


  return (
    <div>
        <NavbarLessons numParam={numParam} modulo={leccion?.modulo}/>
        

       <article className='md:pl-5 mt-4 md:mt-20'>
       <div 
            dangerouslySetInnerHTML={{__html: leccion?.html || ''}}
        />
       </article>

        

    </div>
  )
}

export default page