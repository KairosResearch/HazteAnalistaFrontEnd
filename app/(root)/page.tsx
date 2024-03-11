'use client';
import React from 'react'
import Lessons from '@/components/shared/Lessons';
import InputSearcher from '@/components/shared/InputSearcher';
import Dashboard from '@/components/shared/Dashboard';





//Context (menu)
import {useStateContext}  from '@/contexts/ContextProvider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';


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
      <section className='pb-4 pt-2' id='lecciones-main-page'>
        <div className="md:flex items-center justify-between lessons-header ">
            <h1 className='text-2xl md:text-4xl font-bold hidden md:block'>
              Lecciones:
            </h1>
            <InputSearcher />
        </div>
        <Lessons />
      </section>

      <section className="seguimiento pb-8">
        <div className='flex items-center justify-between'>
          <h1
            className='text-2xl font-bold my-4 md:my-8 md:text-4xl'
          >Dashboard de seguimiento:</h1>
          <Button
            className='hover:bg-card-foreground hover:text-card text-card-foreground rounded-lg px-4 py-2 text-sm font-bold'
            variant='outline'  
          >
            <p>
            <span className='hidden md:inline'>Agregar proyecto</span>
            <span>+</span>
            </p>
          </Button>
        </div>
        
          <Dashboard />
        
      </section>

    </div>
      
    </div>
  )
}

export default HomePage