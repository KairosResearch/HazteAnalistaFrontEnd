"use server";
import {
  postAnalisisCualitativo,
  postAnalisisCuantitativo,
  updateAnalisisCualitativo,
  updateAnalisisCuantitativo,
  getSingleAnalysisCualitative,
  getSingleAnalysisCuantitative,
} from "@/services/backend/analysis";
import { AnalysisResponse } from "..";

export const handleGetSingleAnalysis = async (
  idCual: number,
  idCuant: number
  
) => {
  const allCualitative = await getSingleAnalysisCualitative(idCual);
  
  console.log(idCuant)
  const allCuantitative = await getSingleAnalysisCuantitative(idCuant);
  console.log("All Cuantitative", allCuantitative);
  return {
    filteredCualitative: allCualitative,
    filteredCuantitative: allCuantitative,
  } as AnalysisResponse;
};

export const handleCreateAnalysis = async (
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
    if (res.message === "Analisis Cualitativo guardado exitosamente!") {
      return true;
    }
  } else {
    const res = await postAnalisisCuantitativo(requestBody);
    if (res.message === "Analisis Cuantitativo guardado exitosamente!") {
      return true;
    }
  }
};

export const handleUpdateAnalysis = async (
  data: any,
  guzma: number,
  projectId: number,
  type: string,
  analysisId: number,
) => {
  const requestBody = {
    idUsuario: guzma,
    idProyecto: projectId,
    idAnalisis: analysisId,
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
