'use client';
import React from 'react'
import Lessons from '@/components/shared/Lessons';
import InputSearcher from '@/components/shared/InputSearcher';
import Dashboard from '@/components/shared/Dashboard';





//Context (menu)
import {useStateContext}  from '@/contexts/ContextProvider';


const HomePage = () => {
  const { activeMenu, setActiveMenu } = useStateContext();
  

  return (
    <div className='px-4'>
      {/* Hamburger de arriba para colapsar sidebar */}
      <button
        className='hidden md:block'
        onClick={() => setActiveMenu(!activeMenu)}
      >
        <svg
          className="w-8 h-8 mt-2 ml-2"
          fill="none"
          stroke="#319383" 
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

    <div className="md:px-24">
      {/* Seccion de lecciones*/}
      <section className='py-4' id='lecciones-main-page'>
        <div className="md:flex items-center justify-between lessons-header ">
            <h1 className='text-2xl md:text-4xl  font-bold'>
              Lecciones:
            </h1>
            <InputSearcher />
        </div>
        <Lessons />
      </section>

      <section className="seguimiento">
        <h1
          className='text-2xl font-bold my-4 md:my-8 md:text-4xl'
        >Dashboard de seguimiento:</h1>
        
        <Dashboard />
      </section>
    </div>

      
      
      

      
      
    </div>
  )
}

export default HomePage