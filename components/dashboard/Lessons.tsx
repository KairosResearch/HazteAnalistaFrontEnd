"use client";
//Imports for the component.
//React
import React, { Suspense, useEffect } from "react";
//context(menú), also react
import { useStateContext } from "@/contexts/ContextProvider";

//Values and utilities
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AllModules, LessonPortadaProps, LessonProps } from "@/index";
// import {
//   getLastElement,
//   lessonsCompletedArray,
// } from "@/utils/lessons/lessonsUtils";
//Components
import LessonsCard from "@/components/lessons/LessonsCard";
import Loading from "../shared/Loading";
import SkeletonCard from "../shared/skeletons/SkeletonCard";
//Data
//import { lessons } from "@/lib/data";
//Hooks
import { useLessons } from "@/hooks/useLessons";
import { useUserGuzma } from "@/hooks/useUserData";

type LessonsProps = {
  allModules: AllModules | undefined;
};
const Lessons = ({ allModules }: LessonsProps) => {
  // const { userGuzma } = useUserGuzma();

  const { activeMenu } = useStateContext();
  const [lessons, setLessons] = React.useState<LessonProps[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const { module, completed, isLoading } = useLessons();

  useEffect(() => {
    const meCompota = async () => {
      // setLoading(true);


     
      if (allModules != undefined) {
        if (module === 2) {
          const moduleLesson = allModules["Módulo 2"];
          setLessons(moduleLesson);
        } else if (module === 3) {
          const moduleLesson = allModules["Módulo 3"];
          setLessons(moduleLesson);
        } else if (module === 1) {
          const moduleLesson = allModules["Módulo 1"];
          setLessons(moduleLesson);
        }
      }
      // setLoading(false);
    };
    meCompota();
    //eslint-disable-next-line react-hooks/exhaustive-deps   
  }, [module]);

  
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
          {isLoading && (
          <div className="flex gap-3">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}
          <CarouselPrevious></CarouselPrevious>
          <CarouselContent className={` flex items-stretch`}>
            {lessons.map((lesson) => {
              const portada: LessonPortadaProps = JSON.parse(
                lesson.html_portada,
              );
              const link = `/lessons/${portada.id}`;

              return (
                <CarouselItem
                  className={`md:basis-1/3 ${activeMenu ? "md:w-[66px] md:basis-1/3  lg:w-[176px] 2xl:w-full" : "pl-6 2xl:basis-1/5 lg:max-xl:basis-1/4 md:max-lg:w-[80px]"} `}
                  key={lesson.id}
                >
                  <LessonsCard
                    lesson={portada}
                    lessonNumber={lesson.numero_leccion}
                    link={link}
                    status={
                      completed.find((item:number) => item === portada.id)
                        ? 1
                        : 0
                    }
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselNext></CarouselNext>
        </Carousel>
      </div>

      {/* Carousel de lecciones en mobile */}
      <div className="md:hidden px-1 pt-8 flex overflow-x-scroll gap-6">
        {loading && (
          <div className="flex gap-3">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}
        {lessons.map((lesson, i) => {
          const portada: LessonPortadaProps = JSON.parse(lesson.html_portada);
          const link = `/lessons/${portada.id}`;

          return (
            <LessonsCard
              key={i}
              lesson={portada}
              lessonNumber={lesson.numero_leccion}
              link={link}
              status={
                completed.find((item: number) => item === portada.id) ? 1 : 0
              }
            />
          );
        })}
      </div>
    </>
  );
};

export default Lessons;
