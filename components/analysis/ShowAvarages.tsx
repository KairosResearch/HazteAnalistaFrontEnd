"use client";
//Imports for the component.
//React
import React, { useEffect, useState } from "react";
//Hooks
import { useAverages } from "@/hooks/useAnalisys";

const ShowAvarages = () => {
  const { cuantitativePromedio, cualitativePromedio } = useAverages();
  const [promedio, setPromedio] = useState<number>(0);
  //Change the promedio (avg) everytime cuantitative and cualitative averages update, this will trigger the useEffect

  useEffect(() => {
    setPromedio((cuantitativePromedio + cualitativePromedio)/2);
    console.log("promedio", promedio);
  }, [cuantitativePromedio, cualitativePromedio]);
  return (
    <div className="fixed md:sticky md:top-[-1px] top-12 right-9  z-20 mt-10 bg-dark-black/95 text-primary-foreground/70 w-[12%] md:w-full rounded flex flex-col text-sm  p-1 px-2">
      <div className="">
        <h2 className="mt-0"><span className="hidden md:inline">Promedio del proyecto:</span> <span className="">{promedio}%</span> </h2>
      </div>
      <div className="hidden md:block">
        <h2>Promedio cualitativo: {cualitativePromedio}%</h2>
      </div>
      <div className="hidden md:block">
        <h2>Promedio del cuantitativo: {cuantitativePromedio}%</h2>
      </div>
    </div>
  );
};

export default ShowAvarages;
