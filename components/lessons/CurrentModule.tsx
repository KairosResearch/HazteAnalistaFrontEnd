"use client";
import React, { useEffect } from "react";
// import { getLastElement } from "@/utils/lessons/ultimoElemento";
import { AllModules, LessonPortadaProps, LessonProps } from "@/index";
import {
  getLastElement,
  lessonsCompletedArray,
} from "@/utils/lessons/lessonsUtils";
import { getGuzmaValue } from "@/utils/values";
import LessonsCard from "./LessonsCard";
import { getLastLesson } from "@/services/backend/lessons";
import { Separator } from "../ui/separator";
import SkeletonCard from "../shared/skeletons/SkeletonCard";

type Props = {
  allModules: AllModules | undefined;
};

const CurrentModule = ({ allModules }: Props) => {
  const [modules, setModules] = React.useState<any[]>([]);
  const [lessonsCompleted, setLessonsCompleted] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  useEffect(() => {
    const getModules = async () => {
      setLoading(true);
      const { currentModuleId } = (await getLastElement()) as {
        currentModuleId: number;
      };

      if (allModules != undefined) {
        if (currentModuleId === 2) {
          setModules([allModules["Módulo 1"], allModules["Módulo 2"]]);
        } else if (currentModuleId === 3) {
          setModules([
            allModules["Módulo 1"],
            allModules["Módulo 2"],
            allModules["Módulo 3"],
          ]);
        } else {
          setModules([allModules["Módulo 1"]]);
        }
      }
    };
    getModules();
    const getLessonsCompleted = async () => {
      const lessonsArray = await lessonsCompletedArray();
      setLessonsCompleted(lessonsArray);
      setLoading(false);
    };
    getLessonsCompleted();
  }, []);

  console.log(lessonsCompleted);

  return (
    <>
    {
      loading && <div role="row" className="grid grid-cols-1 px-4 gap-6 md:grid-cols-2 lg:grid-cols-3">
        
        <SkeletonCard/>
        <SkeletonCard/>
        <SkeletonCard/>
        <SkeletonCard/>
        <SkeletonCard/>

      </div>
    }
      {modules &&
        modules.map((mod, i) => (
          <div role="row" key={i}>
            <h1>
            </h1>
            <Separator className="mb-6"/>
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

export default CurrentModule;
