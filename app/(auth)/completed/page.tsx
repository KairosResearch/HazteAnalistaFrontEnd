import React from 'react'
import Link from 'next/link'

const  CompletedRegistration = () => {
  return (
    <div className='bg-[#2c2c2c] p-10 rounded-lg shadow-md flex flex-col flex-center w-120'>
        <p className='text-xl md:text-2xl xl:text-3xl font-bold text-center text-green-dark'>
          Registro completado! 
        </p>
        <p className='text-center  text-white mt-5'>
          Vamos a logearnos para empezar tu cryptolife!
        </p>
        <div className='flex justify-center'>
            <Link href='/' className='bg-green-dark text-white px-4 py-2 rounded-md mt-5'>   
                Iniciar sesión
            </Link>
            </div>
        
    </div>
  )
}

export default CompletedRegistration