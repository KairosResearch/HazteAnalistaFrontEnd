import React from "react";
import ListProjects from "@/components/analysis/ListProjects";

const page = () => {
  
  return (
    <main>
      <h1>Análisis express a profundidad:</h1>

    <section className="px-1">
    <h2>
        Tu lista de proyectos guardados:
      </h2>
      <p>Analiza un proyecto de manera cuantitativa y cualitativa.</p>
      <section className="my-8">
        <ListProjects />
      </section>
    </section>
      
       
    </main>
  );
};

export default page;
