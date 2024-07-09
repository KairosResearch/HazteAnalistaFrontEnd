"use client";
import React, { useEffect } from "react";

//Context (menu)
import { useStateContext } from "@/contexts/ContextProvider";

//Components
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import LessonsCard from "@/components/lessons/LessonsCard";
//Data
//import { lessons } from "@/lib/data";
import { AllModules, LessonProps } from "@/index";
import {getLastElement }from "@/utils/lessons/ultimoElemento";

type LessonsProps = {
  allModules: AllModules |  undefined;
};
const Lessons = ({allModules}: LessonsProps) => {
  const { activeMenu } = useStateContext();
  const [lessons, setLessons] = React.useState<LessonProps []>([]);
  const [lastLesson, setLastLesson] = React.useState<number>(0);
  console.log("Llegando a Lessons", allModules)

  useEffect(() => { 
    const meCompota = async () => {
      console.log("Holaa" )
      const { currentModuleId, id_leccion } = (await getLastElement()) as {
        currentModuleId: number;
        id_leccion: number;
      };
      console.log(currentModuleId, id_leccion)
      setLastLesson(id_leccion);
      if (allModules != undefined){
        if (currentModuleId === 2) {
          const moduleLesson = allModules["Módulo 2"];
          setLessons(moduleLesson);
        }else
        if (currentModuleId === 3) {
          const moduleLesson = allModules["Módulo 3"];
          setLessons(moduleLesson);
        }else
        if (currentModuleId === 1) {

          const moduleLesson = allModules["Módulo 1"];
          setLessons(moduleLesson);
        }

      }
      
    };  
  meCompota();
  }, []);

  console.log(lessons)
  return (
    <>
      {/* Carousel de lecciones */}
      <div
        className={` hidden md:flex 2xl:p-14 2xl:py-2 2xl:px-20 md:px-10 2xl:mt-9 mt-3 `}
      >
        <Carousel
          opts={{
            loop: true,
          }}
          // className={`w-full ${!activeMenu ? 'md:max-2xl:w-[90%]': ''} `}
        >
          <CarouselPrevious></CarouselPrevious>
          <CarouselContent className={` flex items-stretch`}>
            {lessons.map((lesson) => (
              <CarouselItem
                className={`md:basis-1/3 ${activeMenu ? "md:w-[66px] md:basis-1/3  lg:w-[176px] 2xl:w-full" : "pl-6 2xl:basis-1/5 lg:max-xl:basis-1/4 md:max-lg:w-[80px]"} `}
                key={lesson.id}
              >
                {/* <LessonsCard lesson={lesson} link={lesson.link} status={1}/> */}
                <h2>
                  {lesson.leccion}
                  <br />
                  {lesson.numero_leccion} 
                  <br />
                  Modulo {lesson.id_modulo}
                </h2>
              
                {(lesson.id <= lastLesson) ? <p>Completado</p> : <p>Pendiente</p>}

                
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext></CarouselNext>
        </Carousel>
      </div>

      {/* Carousel de lecciones en mobile */}
      <div className="md:hidden px-1 pt-8 flex overflow-x-scroll gap-6">
        {lessons.map((lesson) => (
          // <LessonsCard lesson={lesson} key={lesson.id} link={lesson.link} status={1}/>
                <h2>
                  {lesson.leccion}
                  <br />
                  {lesson.numero_leccion} 
                  <br />
                  Modulo {lesson.id_modulo}
                  {(lesson.id <= lastLesson) ? <span>Completado</span> : <span>Pendiente</span>}

                </h2>
              
        ))}
      </div>
    </>
  );
};

export default Lessons;
