import React from "react";

import { aprendizaje } from "@/lib/data";
import LessonsCard from "@/components/lessons/LessonsCard";


const page = () => {
  const leccion = aprendizaje[0].lessons.find((lesson) => lesson.id === 1) as any;
  const {html,  ...leccionSinHtml } = leccion;
  const lessonItemsToShow = { ...leccionSinHtml, link: `/lessons/${leccion?.id}` };
  return (
    <div className="my-10">
      <h1 className="text-2xl px-3">Continua donde te quedaste 😉: </h1>
      <section className="mx-auto my-1 w-full md:w-8/12 lg:w-[40%] xl:w-5/12 p-8 ">
      
        <LessonsCard
          lesson={lessonItemsToShow}
        />
      </section>

      <h1 className="text-2xl px-3">Nuestros modulos de aprendizaje</h1>
      <section className="w-11/12 mt-10 md:w-[90%] md:grid  mx-auto flex flex-col gap-6">
        {aprendizaje.map((aprendizaje, i) => (
          <div role="row" key={i}>
            <h1 className="text-2xl mb-6">Modulo {aprendizaje.modulo}</h1>
            <section className="grid grid-cols-1 px-4 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {aprendizaje.lessons.map((leccion, i) => {
                const { html, ...leccionSinHtml } = leccion;
                const lessonItemsToShow = { ...leccionSinHtml, link: `/lessons/${leccion?.id}` };
                return <LessonsCard key={i} lesson={lessonItemsToShow} />;  
              })}
            </section>
          </div>
        ))}
      </section>
    </div>
  );
};

export default page;
