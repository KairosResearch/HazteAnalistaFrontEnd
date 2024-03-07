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
      <div className=' hidden md:flex p-14 md:py-8 md:px-20 mt-9 xl:px-32 '>
          <Carousel
            opts={{
              loop: true,
            }}
          >
            <CarouselPrevious>
              
            </CarouselPrevious>
            <CarouselContent className='flex items-stretch'>
              {lessons.map((lesson) => (
                <CarouselItem className='basis-1/3 w-28' key={lesson.id}>
                  <Card className='h-full'>
                    <CardHeader className='max-h-[180px]'>
                      <img style={{height: '180px'}} src={lesson.img}  alt="" />
                    </CardHeader>
                    <CardContent>
                      <p className='text-sm line-clamp-1'>
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
        <div className='md:hidden px-1 pt-12 flex overflow-x-scroll gap-6'>
                {lessons.map((lesson) => (
                    <Card className='min-w-64 ' key={lesson.id}>
                      <CardHeader className='max-h-[180px]'>
                      <img style={{height: '180px'}} src={lesson.img} alt="" /> 
                      </CardHeader>
                      <CardContent>
                        <p className=' text-sm line-clamp-2'>
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