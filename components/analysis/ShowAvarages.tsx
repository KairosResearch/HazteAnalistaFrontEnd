"use client";
import React, {  useEffect, useState } from "react";
import { useAverages } from "@/hooks/useAnalysis";

const ShowAvarages = () => {
  const { setCaulitativePromedio, setCuantitativePromedio, cuantitativePromedio, cualitativePromedio } = useAverages();
  const [promedio, setPromedio] = useState<number>(0);

  useEffect(() => {
    setCuantitativePromedio(0);
    setCaulitativePromedio(0);
  }, []);


  //Change the promedio (avg) everytime cuantitative and cualitative averages update, this will trigger the useEffect

  useEffect(() => {
    setPromedio((cuantitativePromedio + cualitativePromedio)/2);
    console.log("promedio", promedio);
  }, [cuantitativePromedio, cualitativePromedio]);
  return (
    <div className="fixed md:sticky md:top-[-1px] h-32 md:h-auto w-1/4  z-20  bg-dark-black/95 text-primary-foreground/70 top-28 right-[-1px] md:w-full rounded flex flex-col text-sm  p-1 px-2">
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
