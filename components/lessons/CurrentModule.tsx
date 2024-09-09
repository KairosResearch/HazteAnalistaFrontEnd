"use client";
//Imports for the component.
//React
import React, { useEffect } from "react";
//Values and utilities
// import { getLastElement } from "@/utils/lessons/ultimoElemento";
import { AllModules, LessonPortadaProps, LessonProps } from "@/index";
// import {
//   getLastElement,
//   lessonsCompletedArray,
// } from "@/utils/lessons/lessonsUtils";
//Services API
// import { getLastLesson } from "@/services/backend/lessons";
//Components
import { Separator } from "../ui/separator";
import SkeletonCard from "../shared/skeletons/SkeletonCard";
import LessonsCard from "./LessonsCard";
//Hooks
import { useLessons } from "@/hooks/useLessons";
import { useUserGuzma } from "@/hooks/useUserData";

type Props = {
  allModules: AllModules | undefined;
};

const CurrentModule = ({ allModules }: Props) => {
  
  const module1 = allModules && allModules["Módulo 1"];
  const module2 = allModules && allModules["Módulo 2"];
  const module3 = allModules && allModules["Módulo 3"];

  const modulesToRender: LessonProps[][] = [module1 as LessonProps[] , module2 as LessonProps[], module3 as LessonProps[]]
  

  // const { userGuzma } = useUserGuzma();
  const [lessonsCompleted, setLessonsCompleted] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  //traer guzma de localstorage

  const { completed, isLoading, isError } = useLessons();

  useEffect(() => {
    
    if (completed !== undefined && completed !== null) {
      setLessonsCompleted(completed);
    }
    // const getLessonsCompleted = async () => {
    //   const lessonsArray = await lessonsCompletedArray();
    //   setLessonsCompleted(lessonsArray);
    //   setLoading(false);
    // };
    // getLessonsCompleted();
  }, []);

  console.log(isLoading);

  return (
    <>
      {isError && (
        <div
          role="row"
          className="grid grid-cols-1 px-4 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <h1>Hubo un error al cargar los módulos: ${isError}</h1>
        </div>
      )}
      {isLoading === true && (
        <div
          role="row"
          className="grid grid-cols-1 px-4 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}
      {modulesToRender &&
        modulesToRender.map((mod:LessonProps[] , i: number) => (
          <div role="row" key={i}>
            <h1></h1>
            <Separator className="mb-6" />
            <section className="grid grid-cols-1 px-4 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mod.map((lesson: any, i: number) => {
                const portada: LessonPortadaProps = JSON.parse(
                  lesson.html_portada,
                );
                const link = `/lessons/${portada.id}`;

                return (
                  <LessonsCard
                    key={i}
                    lesson={portada}
                    lessonNumber={lesson.numero_leccion}
                    link={link}
                    status={
                      lessonsCompleted.find((item) => item === portada.id)
                        ? 1
                        : 0
                    }
                  />
                );
              })}
            </section>
          </div>
        ))}
    </>
  );
};

export default React.memo(CurrentModule);
