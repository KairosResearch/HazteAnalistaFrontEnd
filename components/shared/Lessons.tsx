'use client';
import React from 'react'
//Components
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  import {
    Card,
    CardContent,
    CardHeader,
  } from "@/components/ui/card"
//Data
import {lessons} from '@/lib/data';


const Lessons = () => {
  return (
    <section className='py-4' id='lecciones-main-page'>
        {/* Header de lecciones: titulo y buscador */}
        <div className="md:flex lessons-header">
          <h1 className='text-2xl font-bold'>
            Lecciones:
          </h1>
          <div className="relative w-full ">
            <input 
              type="text" 
              className="block w-full bg-transparent border-b-2 focus:border-green-light border-green-dark focus:outline-none
               text-grey-light placeholder-grey-light transition-colors duration-200 ease-in-out p-2 mt-2" 
              placeholder="Busca una lección..."  
            />
            <svg xmlns="http://www.w3.org/2000/svg" style={{transform: 'translateY(-50%)'}} className="absolute right-5 top-[50%] w-6 h-6" 
                viewBox="0 0 24 24" fill="none" stroke="#edf4fb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>

        {/* Carousel de lecciones */}
        <div className=' hidden md:flex p-14 '>
          <Carousel
            opts={{
              loop: true,
            }}
          >
            <CarouselPrevious>
              
            </CarouselPrevious>
            <CarouselContent className='flex items-stretch'>
              {lessons.map((lesson) => (
                <CarouselItem className='basis-1/3' key={lesson.id}>
                  <Card className='h-full'>
                    <CardHeader className=''>
                      <img src={lesson.img} alt="" />
                    </CardHeader>
                    <CardContent>
                      <p>
                        {lesson.title}
                      </p>
                      <span className='opacity-75 text-xs'>
                        {lesson.date}
                      </span>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext>
              
            </CarouselNext>
          </Carousel>
        </div>

        {/* Carousel de lecciones en mobile */}
        <div className='md:hidden p-1 py-12 flex overflow-x-scroll gap-12'>
                {lessons.map((lesson) => (
                    <Card className='min-w-64 ' key={lesson.id}>
                      <CardHeader>
                      <img src={lesson.img} alt="" /> 
                      </CardHeader>
                      <CardContent>
                        <p>
                          {lesson.title}
                        </p>
                        <span className='opacity-75 text-xs'>
                          {lesson.date}
                        </span>
                        
                      </CardContent>
                    </Card>
                ))}
              
        </div>
        

      </section>
  )
}

export default Lessons