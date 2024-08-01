"use client";
//Imports for the component.
//React
import React, { useEffect, useState } from "react";
//Values and utils
import { AnalisysCatalogs } from "@/index";
//Components
import AnalysisForm from "@/components/analysis/AnalysisForm";
//Actions
import { handleGetSingleAnalisys } from "@/actions/analisysActions";
//Hooks
import { useAverages } from "@/hooks/useAnalisys";
// import {AnalisysResponse} from '@/index'

type FormContainerProps = {
  type: "cual" | "cuant";
  mode: "add" | "edit";
  // data?: BackendValues;
  // catalogos: CatalogosType;
  // mode: "add" | "edit";
  data: AnalisysCatalogs;
};

const FormContainer = ({ type, mode, data }: FormContainerProps) => {
  const { setCuantitativePromedio, setCaulitativePromedio } = useAverages();
  const initialState = 0;
  // filteredCualitative: {
  //     id_usuario:0,
  //     id_proyecto:0,
  //     id_caso_uso:0,
  //     id_integrantes_equipo:0,
  //     id_auditoria:0,
  //     id_roadmap:0,
  //     id_comunidad:0,
  //     id_financiamiento:0,
  //     id_whitepapaers:0,
  //     id_alianzas:0,
  //     promedio:0,
  // }, // Asegúrate de que este valor inicial coincida con la estructura esperada de AnalisysInitialvalues
  // filteredCuantitative: {
  //     id_usuario:0,
  //     id_proyecto:0,
  //     id_tokenomic:0,
  //     id_movimientosOnChain:0,
  //     id_metricasExchage:0,
  //     id_financiamitos:0,
  //     promedio:0,
  // Lo mismo aquí

  const [initialValues, setInitialValues] = useState<any>(initialState);

  useEffect(() => {
    async function fetchDataAnalysis() {
      if (mode === "edit") {
        const guzma = Number(window.localStorage.getItem("guzma"));
        const projectId = Number(localStorage.getItem("projectId"));
        const response = await handleGetSingleAnalisys(guzma, projectId);
        console.log("recien", response);
        if (response) {
          setInitialValues(response);
          setCuantitativePromedio(response.filteredCuantitative.promedio);
          setCaulitativePromedio(response.filteredCualitative.promedio);
        } else {
          // Considera manejar el caso en que la respuesta no es lo que esperas
          console.error("No se pudieron obtener los datos del análisis");
        }
      } else {
        setCuantitativePromedio(0);
        setCaulitativePromedio(0); 
        setInitialValues(initialState);
      }
    }

    fetchDataAnalysis();
  }, [mode]);

  return (
    <div>
      {mode === "edit" && initialValues != 0 && (
        <>
          {
            <AnalysisForm
              data={data}
              type={type}
              mode={mode}
              initialValues={initialValues}
            />
          }
        </>
      )}
      {mode === "edit" && initialValues === 0 && <h1>loading...</h1>}
      {mode === "add" && (
        <AnalysisForm
          data={data}
          type={type}
          mode={mode}
          initialValues={null}
        />
      )}
    </div>
  );
};

export default FormContainer;
