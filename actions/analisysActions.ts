"use server";
import {
  postAnalisisCualitativo,
  postAnalisisCuantitativo,
  updateAnalisisCualitativo,
  updateAnalisisCuantitativo,
  getSingleAnalisysCualitative,
  getSingleAnalisysCuantitative,
} from "@/services/backend/analisys";
import { AnalisysResponse } from "..";

export const handleGetSingleAnalisys = async (
  idCual: number,
  idCuant: number
  
) => {
  const allCualitative = await getSingleAnalisysCualitative(idCual);
  
  console.log(idCuant)
  const allCuantitative = await getSingleAnalisysCuantitative(idCuant);
  console.log("All Cuantitative", allCuantitative);
  return {
    filteredCualitative: allCualitative,
    filteredCuantitative: allCuantitative,
  } as AnalisysResponse;
};

export const handleCreateAnalisys = async (
  data: any,
  guzma: number,
  projectId: number,
  type: string,
) => {
  const requestBody = {
    idUsuario: guzma,
    idProyecto: projectId,
    ...data,
  };
  console.log("Request Body", requestBody);
  console.log(type);
  if (type === "cual") {
    const res = await postAnalisisCualitativo(requestBody);
    if (res.message === "Análisis Cualitativo guardado exitosamente!") {
      return true;
    }
  } else {
    const res = await postAnalisisCuantitativo(requestBody);
    if (res.message === "Análisis Cuantitativo guardado exitosamente!") {
      return true;
    }
  }
};

export const handleUpdateAnalisys = async (
  data: any,
  guzma: number,
  projectId: number,
  type: string,
  analisysId: number,
) => {
  const requestBody = {
    idUsuario: guzma,
    idProyecto: projectId,
    idAnalisis: analisysId,
    ...data,
  };
  console.log("Request Body", requestBody);
  console.log(type);
  if (type === "cual") {
    const res = await updateAnalisisCualitativo(requestBody);
    console.log(res);
    if (res) {
      return true;
    }
  } else {
    const res = await updateAnalisisCuantitativo(requestBody);
    if (res) {
      return true;
    }
  }
};
