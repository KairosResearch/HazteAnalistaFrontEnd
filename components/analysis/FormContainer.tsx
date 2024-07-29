"use client";
import React, { useEffect, useState } from "react";
import { AnalisysCatalogs } from "@/index";
import AnalysisForm from "@/components/analysis/AnalysisForm";
import { handleGetSingleAnalisys } from "@/actions/analisysActions";
import { useAverages } from "@/hooks/useAnalisys";
// import {AnalisysResponse} from '@/index'

type FormContainerProps = {
  type: "cual" | "cuant";
  mode: "add" | "edit-both" | "edit-cual" | "edit-cuant";
  // data?: BackendValues;
  // catalogos: CatalogosType;
  // mode: "add" | "edit";
  data: AnalisysCatalogs
  cualId: number | null;
  cuantId: number| null;
};

const FormContainer = ({ type, mode, data, cualId, cuantId }: FormContainerProps) => {
  const { setCuantitativePromedio, setCaulitativePromedio } = useAverages();
  const initialState = 0;
 

  const [initialValues, setInitialValues] = useState<any>(initialState);

  useEffect(() => {
    async function fetchDataAnalysis() {
      if (mode === "edit-both" || mode === "edit-cual" || mode === "edit-cuant") {
        console.log("Numero que necesito:", cuantId)
        if(cuantId !== 0 && cuantId !== null){

          const response = await handleGetSingleAnalisys(cualId??0, cuantId??0);
          console.log("recien", response);
          if (response) {
            if (mode === "edit-cual") {
              setInitialValues({
                filteredCualitative: response.filteredCualitative,
                filteredCuantitative: {
                  tokenomics: [0],
                  onChain: [0],
                  finance: [0],
                  exchange: [0],
                },
              });
              setCuantitativePromedio(response.filteredCuantitative.suma[0]);
            } else if (mode === "edit-cuant") {
              console.log("Cuantitativo", response.filteredCuantitative);
              setInitialValues({
                filteredCualitative: {
                  alianzas: [],
                  auditoria: [],
                  integrantesEquipo: [],
                  financiamiento: [],
                  whitepapaer: [],
                },
                filteredCuantitative: response.filteredCuantitative,
              });
              setCaulitativePromedio(response.filteredCualitative.suma[0]);
            } else if (mode === "edit-both") {
              setInitialValues(response);
              setCuantitativePromedio(response.filteredCuantitative.suma[0]);
              setCaulitativePromedio(response.filteredCualitative.suma[0]);
            }
          } else {
            console.error("No se pudieron obtener los datos del análisis");
          }
        }
      } else {
        setCuantitativePromedio(0);
        setCaulitativePromedio(0); 
        setInitialValues(initialState);
      }
    }

    fetchDataAnalysis();
  }, [mode, cuantId, cualId]);

  console.log(mode, initialValues);
  return (
    <div>
      {(mode === "edit-both" || mode === "edit-cual" || mode === "edit-cuant") && initialValues != 0 && (
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
      {(mode === "edit-both" || mode === "edit-cual" || mode === "edit-cuant") && initialValues === 0 && <h1>loading...</h1>}
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
