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

// interface LessonProps {
//   lessons: [{
//     id: number;
//     img: string;
//     title: string;
//     date: string;
//   }]
// }


const Lessons = () => {
  const { activeMenu,  } = useStateContext();
  return (
    <>
    {/* Carousel de lecciones */}
      <div className={` hidden md:flex 2xl:p-14 2xl:py-2 2xl:px-20 md:px-10 2xl:mt-9 mt-3 `}>
          <Carousel
            opts={{
              loop: true,
            }}
            // className={`w-full ${!activeMenu ? 'md:max-2xl:w-[90%]': ''} `}
          >
            <CarouselPrevious>
              
            </CarouselPrevious>
            <CarouselContent className={` flex items-stretch`}>
              {lessons.map((lesson) => (
                <CarouselItem className={`md:basis-1/3 ${activeMenu ? 'md:w-[66px] md:basis-1/3  lg:w-[176px] 2xl:w-full': 'pl-6 2xl:basis-1/5 lg:max-xl:basis-1/4 md:max-lg:w-[80px]'} ` } key={lesson.id}>
                  <Link
                    href={lesson.link}
                    target='_blank'
                  >
                      <Card className='h-full'>
                      <CardHeader className='max-h-[20vh]'>
                        
                        <img style={{height:'20vh'}} src={lesson.img}  alt="" />
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
                  </Link>
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
                  <Link 
                    href={lesson.link} 
                    key={lesson.id}
                    target='_blank'
                  >
                    <Card className='min-w-64 ' key={lesson.id}>
                      <CardHeader className='max-h-[180px]'>
                      <img style={{height: '180px'}} src={lesson.img} alt="" /> 
                      </CardHeader>
                      <CardContent>
                        <p className='text-sm line-clamp-2'>
                          {lesson.title}
                        </p>
                        <span className='opacity-75 text-xs'>
                          {lesson.date}
                        </span>
                        
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              
        </div>
    </> 
  )
}

export default Lessons