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
  dataCualitative: any,
  dataCuantitative: any,
  guzma: number,
  projectId: number,
) => {
  const requestBodyCualitative = {
    idUsuario: guzma,
    idProyecto: projectId,
    ...dataCualitative,
  };
  const requestBodyCuantitative = {
    idUsuario: guzma,
    idProyecto: projectId,
    ...dataCuantitative,
  };
  // console.log("Request Body", requestBody);
  // console.log(type);
  // if (type === "cual") {
    const [resCual, resCuant] = await Promise.all([
      postAnalisisCualitativo(requestBodyCualitative),
      postAnalisisCuantitativo(requestBodyCuantitative)
  ]);
  
  if (resCual.message === "Analisis Cualitativo guardado exitosamente!" || resCuant.message === "Analisis Cuantitativo guardado exitosamente!") {
      return true;
  }
  
};

export const handleUpdateAnalysis = async (
  dataCualitative: any,
  dataCuantitative: any,
  guzma: number,
  projectId: number,
  
  analysisCualId: number,
  analysisCuantId: number,
) => {
  const requestBodyCualitative = {
    idUsuario: guzma,
    idProyecto: projectId,
    idAnalisis: analysisCualId,
    ...dataCualitative,
  };

  const requestBodyCuantitative = {
    idUsuario: guzma,
    idProyecto: projectId,
    idAnalisis: analysisCuantId,
    ...dataCuantitative,
  };
  // console.log("Request Body", requestBody);
  // console.log(type);
    const [resCual, resCuant] = await Promise.all([
      updateAnalisisCualitativo(requestBodyCualitative),
      updateAnalisisCuantitativo(requestBodyCuantitative)
    ]);

    if (resCual || resCuant) {
        return true;
    }
};
