import React from 'react'
import Lessons from '@/components/shared/Lessons';
import InputSearcher from '@/components/shared/InputSearcher';
import Dashboard from '@/components/shared/Dashboard';
import DialogItem from '@/components/shared/DialogItem';

import Collapser from '@/components/ui/Collapser';

const HomePage = () => {
  
  

  return (
    <div className='px-4'>
      <Collapser />
      <div className="md:px-24">
        {/* Seccion de lecciones*/}
        <section className='py-4 md:pt-8' id='lecciones-main-page'>
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
            <DialogItem mode='add' />
          </div>
          
            <Dashboard />
          
        </section>

      </div>
    </div>
  )
}

export default HomePage