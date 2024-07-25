"use client";

//Imports for the component
//React
import React, { useState, useEffect } from "react";
//Hooks
import { useUserTableData } from "@/hooks/useUserData";
import { useDialogItem, useDialogInstructions } from "@/hooks/useDialogs";
//import { useTabsState } from "@/hooks/useTabs";
import { useAverages } from "@/hooks/useAnalisys";
import { useProjectId } from "@/hooks/useAnalisys";

//Server actions for both adding and updating
import {
  handleCreateAnalisys,
  handleUpdateAnalisys,
} from "@/actions/analisysActions";
import CualitativeFields from "./CualitativeFields";
import CuantitativeFields from "./CuantitativeForm";

//Shadcn staff for forms
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

//UI needed
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

//Values and utils
import { debounce, promedioCalculator } from "@/utils/index";

//Types:
import { ValueObject, AnalisysCatalogs, AnalisysResponse } from "@/index";

import { set } from "zod";
import Loading from "../shared/Loading";
interface AnalysisFormProps {
  type: "cual" | "cuant";
  mode: "add" | "edit";

  data: AnalisysCatalogs;
  initialValues: AnalisysResponse | null;
}

const AnalysisForm = ({
  type,
  mode,
  data,
  initialValues,
}: AnalysisFormProps) => {
  const [cualitativeValues, setCualitativeValues] = useState<ValueObject[]>([]);

  // const [successCualitative, setSuccessCualitative] = useState(false);
  const { setCaulitativePromedio, cualitativePromedio } = useAverages();
  const [cuantitativeValues, setCuantitativeValues] = useState<ValueObject[]>(
    [],
  );
  // const [successCuantitative, setSuccessCuantitative] = useState(false);
  const { setCuantitativePromedio, cuantitativePromedio } = useAverages();
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //For the initial values
  const a = initialValues?.filteredCualitative;
  const b = initialValues?.filteredCuantitative;

  const initialValuesForm =
    mode === "edit" && a && b
      ? type === "cual"
        ? {
            alianzas: String(a?.id_alianzas),
            auditorias: String(a?.id_auditoria),
            equipo: String(a?.id_integrantes_equipo),
            financeCual: String(a?.id_financiamiento),
            whitepaper: String(a?.id_whitepapaers),
            roadmap: String(a?.id_roadmap),
            comunidad: String(a?.id_comunidad),
            casosUso: String(a?.id_caso_uso),
            tokenomics: "0",
            onChain: "0",
            finance: "0",
            exchange: "0",
          }
        : {
            tokenomics: String(b?.id_tokenomic),
            onChain: String(b?.id_movimientosOnChain),
            finance: String(b?.id_financiamitos),
            exchange: String(b?.id_metricasExchage),
          }
      : type === "cual"
        ? {
            alianzas: "0",
            auditorias: "0",
            equipo: "0",
            financeCual: "0",
            whitepaper: "0",
            roadmap: "0",
            comunidad: "0",
            casosUso: "0",
            tokenomics: "0",
            onChain: "0",
            finance: "0",
            exchange: "0",
          }
        : {
            tokenomics: "0",
            onChain: "0",
            finance: "0",
            exchange: "0",
          };

  useEffect(() => {
    setCaulitativePromedio(a?.promedio ?? 0);
    setCuantitativePromedio(b?.promedio ?? 0);
  }, []);
  //Defining the form
  const form = useForm({
    defaultValues: initialValuesForm,
  });

  //Para calcular promedio de cualitativos
  useEffect(() => {
    const debouncedFunction = debounce(() => {
      if (cualitativeValues.length > 0) {
        // Extraer solo los valores numéricos de la propiedad 'value' de cada objeto
        const valoresNumericos = cualitativeValues.map(
          (objeto) => objeto.value,
        );

        console.log("Values to calculate", valoresNumericos);
        const promedio = promedioCalculator(valoresNumericos);
        setCaulitativePromedio(promedio);
      }
    }, 900);

    if (cualitativeValues) {
      debouncedFunction();
    }

    return () => debouncedFunction.cancel();
  }, [cualitativeValues]);

  //Para calcular promedio de cuantitativos
  useEffect(() => {
    const debouncedFunction = debounce(() => {
      if (cuantitativeValues.length > 0) {
        // Extraer solo los valores numéricos de la propiedad 'value' de cada objeto
        const valoresNumericos = cuantitativeValues.map(
          (objeto) => objeto.value,
        );

        console.log("Values to calculate", valoresNumericos);
        const promedio = promedioCalculator(valoresNumericos);
        setCuantitativePromedio(promedio);
      }
    }, 900);

    if (cuantitativeValues) {
      debouncedFunction();
    }

    return () => debouncedFunction.cancel();
  }, [cuantitativeValues]);

  // Submit handler
  async function onSubmit(values: any) {
    setIsLoading(true);
    async function submitHandler(values: any) {
      if (
        typeof window !== "undefined" &&
        window.localStorage.getItem("guzma") !== null
      ) {
        const guzma = Number(window.localStorage.getItem("guzma"));
        const projectId = Number(localStorage.getItem("projectId"));
        if (mode === "add") {
          console.log("Creando con estos values: ", values);
          // const response = await handleCreateAnalisys(
          //   values,
          //   guzma,
          //   projectId,
          //   type,
          // );
          // console.log("Response", response);
          // if (response) {
          //   // Primero, mostrar el mensaje de éxito
          //   setSuccess(true);
          //   // Luego, después de 1 segundo, ocultar el mensaje
          //   setTimeout(() => {
          //     setSuccess(false);
          //   }, 3000); // Ajusta este tiempo según sea necesario
          // }
          setIsLoading(false);
        } else {
          console.log("Editando con estos values: ", values);
          const response = await handleUpdateAnalisys(
            values,
            guzma,
            projectId,
            type,
          );
          console.log("Response", response);
          if (response) {
            // Primero, mostrar el mensaje de éxito
            setSuccess(true);
            // Luego, después de 1 segundo, ocultar el mensaje
            setTimeout(() => {
              setSuccess(false);
            }, 3000); // Ajusta este tiempo según sea necesario
          }
          setIsLoading(false);
        }
      }
    }

    //backend Values para cualitativo
    if (type === "cual") {
      const backendValues = {
        idCasoUso: Number(values.casosUso),
        idIntegrantesEquipo: Number(values.equipo),
        idAuditoria: Number(values.auditorias),
        idRoadmap: Number(values.roadmap),
        idComunidad: Number(values.comunidad),
        idFinanciamiento: Number(values.financeCual),
        idWhitepapaers: Number(values.whitepaper),
        idAlianzas: Number(values.alianzas),
        promedio: cualitativePromedio,
      };
      console.log("Backend Values", backendValues);

      submitHandler(backendValues);
    } else {
      const backendValues = {
        idTokenomic: Number(values.tokenomics),
        idMovimientosOnChain: Number(values.onChain),
        idMetricasExchange: Number(values.exchange),
        idFinanciamiento: Number(values.finance),
        promedio: cuantitativePromedio,
      };
      console.log("Backend Values", backendValues);
      submitHandler(backendValues);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div
          className={`z-50 fixed bottom-5 right-5 bg-primary text-white py-2 px-4 rounded-lg shadow-lg
            transition-opacity duration-1000 ${success ? "opacity-100" : "opacity-0"}`}
          onAnimationEnd={() => setSuccess(false)}
        >
          Subido exitosamente!
        </div>

        <div className="grid gap-4">
          {type === "cual" ? (
            <CualitativeFields
              mode={mode}
              data={data}
              setCualitativeValues={setCualitativeValues}
            />
          ) : (
            <CuantitativeFields
              mode={mode}
              data={data}
              setCuantitativeValues={setCuantitativeValues}
            />
          )}
        </div>

        <Button type="submit" className="w-3/12 float-right  mx-auto mt-4">
          {isLoading && <Loading />}
          {mode === "add" ? "Enviar" : "Actualizar"}
        </Button>
      </form>
    </Form>
  );
};

export default AnalysisForm;
