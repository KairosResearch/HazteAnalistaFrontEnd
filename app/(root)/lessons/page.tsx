import React from "react";

import LessonsCard from "@/components/lessons/LessonsCard";
import { getLessons } from "@/services/backend/lessons";

import CurrentLesson from "@/components/lessons/CurrentLesson";
import CurrentModule from "@/components/lessons/CurrentModule";
const page = async () => {
  const allModules = await getLessons();
  return (
    <div className="my-10">
      <h1 className="text-2xl px-3">Continua donde te quedaste 😉: </h1>
      <section className="mx-auto my-1 w-full md:w-8/12 lg:w-[40%] xl:w-5/12 p-8 ">
        <CurrentLesson />
      </section>

      <h1 className="text-2xl px-3">Nuestros módulos de aprendizaje</h1>
      <p className="px-3">
        Esta parte es educativa y tiene el objetivo de enseñar y a aplicar el
        Método 4E. Aprenderás a descubrir proyectos, analizarlos en profundidad,
        tomar decisiones informadas y evaluar resultados para mejorar tus
        inversiones.
      </p>
      <section className="w-11/12 mt-10 md:w-[90%] md:grid  mx-auto flex flex-col gap-6">
        <CurrentModule allModules={allModules} />
      </section>
    </div>
  );
};

export default page;
