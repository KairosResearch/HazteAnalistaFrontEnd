"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

interface NavbarLessonsProps {
  numParam: number;
  modulo: number | undefined;
}

const NavbarLessons = ({ numParam, modulo }: NavbarLessonsProps) => {


  return (
    <nav
      className={`sticky bottom-0 left-0  
      top-0  h-12 bg-primary   flex items-center justify-between w-full
     px-4 py-2 
    `}
    >
      {numParam === 1 ? null : (
        <Link href={`/lessons/${numParam - 1}`} className="flex gap-3 items-center">
           <Image
          src={'/icons/lessons/Anterior.png'}
          alt="Anterior lección"
          width={30}
          height={30}
        />

          Anterior
       
        
        </Link>
      )}

      <h1 className="text-xl">
        Modulo: {modulo} | Leccion: {numParam}
      </h1>
      <Link href={`/lessons/${numParam + 1}`} className="flex gap-3 items-center">Siguiente
        <Image
            src={'/icons/lessons/Siguiente.png'}
            alt="Siguiente lección"
            width={30}
            height={30}
          />


      </Link>
    </nav>
  );
};

export default NavbarLessons;
