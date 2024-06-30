'use client'
import React from 'react'
import Link from 'next/link'
import {useStateContext} from '@/contexts/ContextProvider';


interface NavbarLessonsProps {
    numParam: number;
    modulo: number | undefined;
}

const NavbarLessons = ({
  numParam, 
  modulo
}: NavbarLessonsProps) => {
  const {activeMenu} = useStateContext();

  return (
    <nav className={`fixed bottom-0 left-0  w-full
      md:top-16 md:right-[15px] md:bottom-auto md:left-auto  h-12 
      bg-primary   flex items-center justify-between 
      ${!activeMenu ? 'w-full' : 'md:w-[78.5%] 2xl:w-[81%]'} px-4 py-2 
    `}>
    {
        numParam === 1 ? null : (
            <Link href={`/lessons/${numParam - 1}`}>
                Anterior
            </Link>
        )
    }
    
    <h1 className='text-xl'>Modulo: {modulo} | Leccion: {numParam}</h1>
    <Link href={`/lessons/${numParam + 1}`}
        
    >
        Siguiente
    </Link>
</nav>
  )
}

export default NavbarLessons