"use client";
import React, { useEffect, useState } from "react";
import { useAverages } from "@/hooks/useAnalisys";

const ShowAvarages = () => {
  const { cuantitativePromedio, cualitativePromedio } = useAverages();
  const [promedio, setPromedio] = useState<number>(0);
  //Change the promedio (avg) everytime cuantitative and cualitative averages update, this will trigger the useEffect

  useEffect(() => {
    setPromedio(cuantitativePromedio + cualitativePromedio);
  }, [cuantitativePromedio, cualitativePromedio]);
  return (
    <div className="sticky top-[-1px] z-20 mt-10 bg-dark-black/95 text-primary-foreground/70 w-full rounded flex flex-col text-sm  p-1 px-2">
      <div>
        <h2>Promedio del proyecto: {promedio}%</h2>
      </div>
      <div>
        <h2>Promedio cualitativo: {cualitativePromedio}%</h2>
      </div>
      <div>
        <h2>Promedio del cuantitativo: {cuantitativePromedio}%</h2>
      </div>
    </div>
  );
};

export default ShowAvarages;
