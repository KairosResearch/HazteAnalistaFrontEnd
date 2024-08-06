// hooks/useProjects.ts
import { useState } from "react";
import useSWR from "swr";
import {handleGetProyects} from "../actions/proyectActions";
import { handleGetSingleAnalysis } from "@/actions/analisysActions";
import { useMemo } from "react";
import { ProjectsDataWithAnalisis } from "..";

export const useProjects = (userId: number) => {

  // Estado para controlar si necesitas el análisis
  const [needAnalysis, setNeedAnalysis] = useState(false);

    const { data, error, mutate } = useSWR(['getProjects', userId], () => handleGetProyects(userId));

    const { data: analysisData, error: analysisError, mutate: mutateAnalysis } = useSWR(needAnalysis &&
      Array.isArray(data) ? ['getAnalysis', data] : null,
      async () => {
        if (!Array.isArray(data)) return [];
  
        const projectsWithAnalisys = await Promise.all(
          data.map(async (project: any) => {
            const analysis = await handleGetSingleAnalysis(project.id_analisis_cualitativo, project.id_analisis_cuantitativo);
            return { ...project, respuestaSegundoFetch: analysis };
          })
        );
        return projectsWithAnalisys as ProjectsDataWithAnalisis[];
      }
    );

    return {
      data,
      dataWithAnalisys: analysisData,
      isLoading: !error && !data,
      isAnalysisLoading: !analysisError && !analysisData,
      isError: error,
      isAnalysisError: analysisError,
      mutate, // This function can be used to revalidate the data manually
      mutateAnalysis, 
      setNeedAnalysis
    };
};