'use client';
import React, {useEffect} from 'react'
import {buscarLesson} from '@/utils/lessons/buscarLesson'
import LessonsCard from './LessonsCard'
import {getLastElement} from '@/utils/lessons/ultimoElemento'


const CurrentLesson = () => {
    const [currentLesson, setCurrentLesson] = React.useState<any>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    useEffect(() => {
        const getCurrentLesson = async () => {  
        const {currentLessonId} = await getLastElement() as { currentLessonId: number; };
                
                     const  leccion = await buscarLesson(currentLessonId);
                    setCurrentLesson(leccion.html_portada)

            
            }
          
            
          
        
        getCurrentLesson()
    }, [])

    console.log("currentLesson", currentLesson)
    const link = `/lessons/${currentLesson?.id}`
    
  return (
        <LessonsCard
          lesson={currentLesson}
          status={0}
          link={link}
        />
  )
}

export default CurrentLesson