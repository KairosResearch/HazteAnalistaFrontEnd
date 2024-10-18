import React from "react";

// import { Progress } from "@/components/ui/progress"

import { getProjectsList } from "@/services/backend/proyectsInfo";
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
//   } from "@/components/ui/table";
import SelectAssetsName from "@/components/compare-assets/SelectAssetsName";
import ProgressBars from "@/components/compare-assets/ProgressBars";

const page = async () => {
  const projectsList = await getProjectsList();
  return (
    <div>
      <header>
        <h1>Compara el market cap de dos diferentes activos</h1>
        {/* <p>
            Este apartado te permite comparar el valor de mercado {'('}market cap{')'} de dos criptomonedas o tokens. 
            Además, te muestra cuál sería el precio del activo A si alcanzara el mismo valor de mercado que el activo B, 
            facilitando una comparación entre su tamaño y potencial.B
            </p> */}
        <p>
          Calcula el precio de {"'"}A{"'"} si tuviera el mismo market cap de{" "}
          {"'"}B{"'"}
        </p>
      </header>

      <section className="flex flex-col gap-4 my-6 mx-auto w-7/12">
        <div className="flex justify-between items-center">
          <SelectAssetsName projectsList={projectsList.proyectos} />
        </div>

        <ProgressBars />
      </section>
    </div>
  );
};

export default page;
