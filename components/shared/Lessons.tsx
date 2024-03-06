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
    <>
    {/* Carousel de lecciones */}
      <div className=' hidden md:flex p-14 md:py-8 md:px-20 mt-9 xl:px-44 '>
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
                      <img style={{height: '200px'}} src={lesson.img}  alt="" />
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
    </> 
  )
}

export default Lessons