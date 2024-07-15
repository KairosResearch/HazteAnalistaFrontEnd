"use client";
import React, { useEffect } from "react";
import { buscarLesson } from "@/utils/lessons/buscarLesson";
import LessonsCard from "./LessonsCard";
import { getLastElement } from "@/utils/lessons/lessonsUtils";
import { LessonPortadaProps, LessonProps } from "@/index";
import { getGuzmaValue } from "@/utils/values";
import { getLastLesson } from "@/services/backend/lessons";
import Link from "next/link";

const CurrentLesson = () => {
  const [currentLesson, setCurrentLesson] = React.useState<LessonProps>();
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const getLastLessonObject = async () => {
      const guzma = await getGuzmaValue();
      console.log("guzma en el currentLesson", guzma);
      const lastLesson = await getLastLesson(guzma);

      setCurrentLesson(lastLesson);
    };
    getLastLessonObject();
  }, []);

  console.log(currentLesson);

  return (
    <>
      {currentLesson ? (
        <LessonsCard
          lesson={JSON.parse(currentLesson.html_portada)}
          lessonNumber={currentLesson.numero_leccion}
          link={`/lessons/${JSON.parse(currentLesson.html_portada).id}`}
          status={0}
        />
      ) : (
        <p>
          O, sí no has empezado, puedes comenzar a leer nuestras lecciones dando
          click
          <Link className="underline" href={"lessons/1"}>
            acá
          </Link>
        </p>
      )}
    </>
  );
};

export default CurrentLesson;
