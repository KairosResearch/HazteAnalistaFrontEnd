"use client";
import React, { useEffect } from "react";
import { buscarLesson } from "@/utils/lessons/buscarLesson";
import LessonsCard from "./LessonsCard";
// import { getLastElement } from "@/utils/lessons/lessonsUtils";
import { LessonPortadaProps, LessonProps } from "@/index";
import { getGuzmaValue } from "@/utils/values";
import { getLastLesson } from "@/services/backend/lessons";
import Link from "next/link";
import SkeletonCard from "../shared/skeletons/SkeletonCard";
import { useUserGuzma } from "@/hooks/useUserData";

const CurrentLesson = () => {
  const { userGuzma } = useUserGuzma();
  const [currentLesson, setCurrentLesson] = React.useState<LessonProps>();
  const [loading, setLoading] = React.useState<boolean>(false);

  useEffect(() => {
    const getLastLessonObject = async () => {
      setLoading(true);
      if (typeof window !== "undefined") {
        const guzma = localStorage.getItem("guzma");
        if (guzma) {
          const id = parseInt(guzma);

          const lastLesson = await getLastLesson(id ?? 0);

          setCurrentLesson(lastLesson);
          console.log(currentLesson);
        }
      }
      setLoading(false);
    };
    getLastLessonObject();
  }, []);

  return (
    <>
      {loading && <SkeletonCard />}
      {currentLesson ? (
        <LessonsCard
          lesson={JSON.parse(currentLesson.html_portada)}
          lessonNumber={currentLesson.numero_leccion}
          link={`/lessons/${JSON.parse(currentLesson.html_portada).id}`}
          status={0}
        />
      ) : (
        <p>
          O, si no has empezado, puedes comenzar a leer nuestras lecciones dando
          click {""}
          <Link className="underline" href={"lessons/1"}>
            Aquí
          </Link>
        </p>
      )}
    </>
  );
};

export default CurrentLesson;
