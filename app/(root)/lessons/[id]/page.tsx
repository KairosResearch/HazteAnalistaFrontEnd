import React from 'react'
import Link from 'next/link'

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
               return leccion;
           }
       }
    }
    const leccion = buscarLeccion();


  return (
    <div>
        <nav className='mx-auto flex items-center justify-between mb-9 w-[98%]'>
            {
                numParam === 0 ? null : (
                    <Link href={`/lessons/${numParam - 1}`}>
                        

                        Anterior
                    </Link>
                )
            }
            
            <h1 className='text-xl'>Esta es la lecccion: {params.id}</h1>
            <Link href={`/lessons/${numParam + 1}`}
                
            >
                Siguiente
            </Link>
        </nav>
        

       <article className='pl-5'>
       <div 
            dangerouslySetInnerHTML={{__html: leccion?.html || ''}}
        />
       </article>

        

    </div>
  )
}

export default page