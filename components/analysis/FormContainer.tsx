"use client";
//Imports for the component.
//React
import React, { useEffect, useState } from "react";
//Values and utils
import { AnalysisCatalogs } from "@/index";
//Components
import AnalysisForm from "@/components/analysis/AnalysisForm";

//Actions

import { handleGetSingleAnalysis } from "@/actions/analisysActions";

//Hooks
import { useAverages } from "@/hooks/useAnalysis";

//types
import { BothCatalogos } from "@/index";

type FormContainerProps = {
  // type: "cual" | "cuant";
  mode: "add" | "edit-both" | "edit-cual" | "edit-cuant";
  // data?: BackendValues;
  // catalogos: CatalogosType;
  // mode: "add" | "edit";
  data: any;
  cualId: number | null;
  cuantId: number | null;
};

const FormContainer = ({
  // type,
  mode,
  data,
  cualId,
  cuantId,
}: FormContainerProps) => {
  const { setCuantitativePromedio, setCaulitativePromedio } = useAverages();
  const [cualAnalisisId, setCualAnalisisId] = useState<number | null>(0);
  const [cuantAnalisisId, setCuantAnalisisId] = useState<number | null>(0);
  const initialState = 0;

  const [initialValues, setInitialValues] = useState<any>(initialState);

  useEffect(() => {
    async function fetchDataAnalysis() {
      if (
        mode === "edit-both" ||
        mode === "edit-cual" ||
        mode === "edit-cuant"
      ) {
        console.log(cualId, cuantId);

        const response = await handleGetSingleAnalysis(
          cualId ?? 0,
          cuantId ?? 0,
        );

        if (response) {
          if (mode === "edit-cual") {
            setInitialValues({
              filteredCualitative: response.filteredCualitative,
              filteredCuantitative: {
                tokenomics: [],
                onChain: [],
                finance: [],
                exchange: [],
              },
            });

            setCaulitativePromedio(response.filteredCualitative.suma[0]);
            setCuantitativePromedio(0);
          } else if (mode === "edit-cuant") {
            setInitialValues({
              filteredCualitative: {
                alianzas: [],
                auditoria: [],
                integrantesEquipo: [],
                financiamiento: [],
                whitepapaer: [],
                roadmap: [],
                comunidad: [],
                caso_uso: [],
              },
              filteredCuantitative: {
                tokenomics: response.filteredCuantitative.tokenomics,
                onChain: response.filteredCuantitative.onchains,
                finance: response.filteredCuantitative.financiamiento,
                exchange: response.filteredCuantitative.metricasExchange,
              },
            });
            setCuantitativePromedio(response.filteredCuantitative.suma[0]);
            setCaulitativePromedio(0);
          } else if (mode === "edit-both") {
            setInitialValues({
              filteredCualitative: response.filteredCualitative,
              filteredCuantitative: {
                tokenomics: response.filteredCuantitative.tokenomics,
                onChain: response.filteredCuantitative.onchains,
                finance: response.filteredCuantitative.financiamiento,
                exchange: response.filteredCuantitative.metricasExchange,
              },
            });
            const cuantSum = response.filteredCuantitative.suma[0];
            const cualSum = response.filteredCualitative.suma[0];
            console.log("Cuantitativo", cuantSum);
            console.log("Cualitativo", cualSum);
            setCuantitativePromedio(cuantSum);
            setCaulitativePromedio(cualSum);
          }
        } else {
          console.error("No se pudieron obtener los datos del análisis");
        }
      } else {
        setInitialValues(initialState);
      }
    }

    fetchDataAnalysis();
    setCuantAnalisisId(cuantId ?? 0);
    setCualAnalisisId(cualId ?? 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, cuantId, cualId]);

  return (
    <>
      {(mode === "edit-both" ||
        mode === "edit-cual" ||
        mode === "edit-cuant") &&
        initialValues != 0 && (
          <>
            {
              <AnalysisForm
                data={data}
                mode={mode}
                initialValues={initialValues}
                cualId={cualAnalisisId}
                cuantId={cuantAnalisisId}
              />
            }
          </>
        )}
      {/* {(mode === "edit-both" || mode === "edit-cual" || mode === "edit-cuant") && initialValues === 0 && <h1>loading...</h1>} */}
      {mode === "add" && (
        <AnalysisForm
          data={data}
          mode={mode}
          initialValues={null}
          cualId={cualAnalisisId}
          cuantId={cuantAnalisisId}
        />
      )}
    </>
  );
};

export default FormContainer;
