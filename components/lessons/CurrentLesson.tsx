"use client";
import React, { useEffect } from "react";
import { buscarLesson } from "@/utils/lessons/buscarLesson";
import LessonsCard from "./LessonsCard";
import { getLastElement } from "@/utils/lessons/ultimoElemento";
import { LessonProps } from "@/index";

const CurrentLesson = () => {
  const [currentLesson, setCurrentLesson] = React.useState<any>({});
  const [loading, setLoading] = React.useState<boolean>(true);
  useEffect(() => {
    const getCurrentLesson = async () => {
      const { currentLessonId } = (await getLastElement()) as {
        currentLessonId: number;
      };

      const leccion = await buscarLesson(currentLessonId);
      setCurrentLesson(leccion);
    };

    getCurrentLesson();
  }, []);

  const link = `/lessons/${currentLesson?.id}`;

  return (
    <>
    <h1>
      {currentLesson.leccion}
    </h1>
    <p>
      {currentLesson.numero_leccion}
    </p>
    {/* <LessonsCard lesson={currentLesson} status={0} link={link} /> */}
    </>
  );
};

export default CurrentLesson;
