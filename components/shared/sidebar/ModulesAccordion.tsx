import React, { useEffect } from 'react'

//Components shadcn
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area' 
import { Clock } from 'lucide-react'

//NextJS
import Image from 'next/image'
import Link from 'next/link'

//Hooks
import { useLessons } from '@/hooks/useLessons'


//Types
import { LessonPortadaProps, LessonProps } from '@/index'

type ModulesAccordionProps = {
    module1: LessonProps[] | undefined
    module2: LessonProps[] | undefined
    module3: LessonProps[] | undefined

  }

const ModulesAccordion = ({
    module1, module2, module3
}: ModulesAccordionProps) => {
    const {completed, module} = useLessons();
    
    const render = (module: LessonProps[] | undefined) => {
        if (!module) {
          return (
            <p>No se pudo traer</p>
          );
        }
    
        return module.map((lesson: LessonProps, i: number) => {
            const portada: LessonPortadaProps = JSON.parse(
                lesson.html_portada
            );

            
            
            return (
                <li className="mb-2 flex gap-2 items-center" key={i}>
            {
                completed.find((item: number) => item === portada.id) ? 
                <Image
                    
                    src={"/icons/lessons/readylesson.png"}
                    height={20}
                    width={20}
                    alt="Lección completada"
                />
                : null
            }
                <Link className="hover:underline" href={`/lessons/${lesson.id}`}>
                <span className='text-xs'>
                    {lesson.leccion}
                </span>
                <span className='block m-0 text-xs text-grey-light/60'>
                    <Clock className="inline" size={10} /> 4 mins
                </span>
                </Link>
                

          </li>
            )
        } 
        )
    };
         
  return (
    
        <Accordion type="multiple"  >
            <AccordionItem value="item-1">
                <AccordionTrigger className='sidebar-nav_element text-md'>
               
                <Image
                  src="/icons/navigation/book.png"
                  alt="lessons"
                  height={25}
                  width={25}
                />
                <Link href={'/lessons'}>
                Hazte analista
                </Link>  
                
              
                </AccordionTrigger>
                <AccordionContent className='pl-12'>


                    <Accordion defaultValue={['item-1']} type="multiple"  className="w-full">
                    <ScrollArea className='h-72 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-dark-grey'>
                        <AccordionItem value="item-1">
                            <AccordionTrigger className='flex gap-3'>
{/*                                 
                                {
                                module  > 1 ? 
                                <Image
                                    
                                    src={"/icons/lessons/readylesson.png"}
                                    height={20}
                                    width={20}
                                    alt="Lección completada"
                                />
                                : null
                            } */}
                                <span>Módulo 1</span>
                                
                            
                            </AccordionTrigger>
                            <AccordionContent className='pl-2'>
                            <ul>
                                {render(module1)}   
                            </ul>
                                
                                
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger className='flex gap-3'>
                            {/* {
                                module  > 2? 
                                <Image
                                    
                                    src={"/icons/lessons/readylesson.png"}
                                    height={20}
                                    width={20}
                                    alt="Lección completada"
                                />
                                : null
                            } */}
                                Módulo 2
                            </AccordionTrigger>
                            <AccordionContent className='pl-2'>
                                <ul>
                                    {render(module2)}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger className='flex gap-3'>
                            {/* {
                                completed.length == 14 ? 
                                <Image
                                    
                                    src={"/icons/lessons/readylesson.png"}
                                    height={20}
                                    width={20}
                                    alt="Lección completada"
                                />
                                : null
                            } */}
                                Módulo 3 
                            </AccordionTrigger>
                            <AccordionContent className='pl-2'>
                            <ul>
                                    {render(module3)}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                        
                    </ScrollArea>
                    </Accordion>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

  )
}

export default ModulesAccordion