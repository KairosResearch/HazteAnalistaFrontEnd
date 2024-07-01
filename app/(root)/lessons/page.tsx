import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { aprendizaje } from "@/lib/data";

const page = () => {
  const leccion = aprendizaje[0].lessons.find((lesson) => lesson.id === 1);

  return (
    <div className="my-10">
      <h1 className="text-2xl px-3">Continua donde te quedaste 😉: </h1>
      <section className="mx-auto my-1 w-full md:w-8/12 lg:w-[40%] xl:w-5/12 p-8 ">
        <Link href={`/lessons/${leccion?.id}`}>
          <Card className="relative h-full">
            <CardHeader className="max-h-[20vh]">
              <img style={{ height: "20vh" }} src={leccion?.cover} alt="" />
            </CardHeader>
            <CardContent>
              <p className="text-sm line-clamp-1">{leccion?.title}</p>
              <span className="opacity-75 text-xs">{leccion?.date}</span>
            </CardContent>
          </Card>
        </Link>
      </section>

      <h1 className="text-2xl px-3">Nuestros modulos de aprendizaje</h1>
      <section className="w-11/12 mt-10 md:w-[90%] md:grid  mx-auto flex flex-col gap-6">
        {aprendizaje.map((aprendizaje, i) => (
          <div role="row" key={i}>
            <h1 className="text-2xl mb-6">Modulo {aprendizaje.modulo}</h1>
            <section className="grid grid-cols-1 px-4 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {aprendizaje.lessons.map((leccion, i) => (
                <Link key={i} href={`/lessons/${leccion.id}`}>
                  <Card className="relative h-full">
                    <CardHeader className="max-h-[20vh]">
                      <img
                        style={{ height: "20vh" }}
                        src={leccion.cover}
                        alt=""
                      />
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm line-clamp-1">{leccion.title}</p>
                      <span className="opacity-75 text-xs">{leccion.date}</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </section>
          </div>
        ))}
      </section>
    </div>
  );
};

export default page;
