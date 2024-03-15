'use client';
import React from 'react'
import Link from 'next/link';

//Context (menu)
import {useStateContext}  from '@/contexts/ContextProvider';

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
  const { activeMenu,  } = useStateContext();
  return (
    <>
    {/* Carousel de lecciones */}
      <div className=' hidden md:flex p-14 md:py-2 md:px-20 mt-9 xl:px-32 '>
          <Carousel
            opts={{
              loop: true,
            }}
          >
            <CarouselPrevious>
              
            </CarouselPrevious>
            <CarouselContent className='flex items-stretch'>
              {lessons.map((lesson) => (
                <CarouselItem className={`${activeMenu ? 'basis-1/3': 'basis-1/5'}` } key={lesson.id}>
                  
                    <Card className='h-full'>
                      <CardHeader className='max-h-[180px]'>
                        
                        <img style={{height: '180px'}} src={lesson.img}  alt="" />
                      </CardHeader>
                      <CardContent>
                        <Link href='#' className='text-sm line-clamp-1'>
                          {lesson.title}
                        </Link>
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
        <div className='md:hidden px-1 pt-8 flex overflow-x-scroll gap-6'>
                {lessons.map((lesson) => (
                    <Card className='min-w-64 ' key={lesson.id}>
                      <CardHeader className='max-h-[180px]'>
                      <img style={{height: '180px'}} src={lesson.img} alt="" /> 
                      </CardHeader>
                      <CardContent>
                        <Link href='#' className='text-sm line-clamp-2'>
                          {lesson.title}
                        </Link>
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