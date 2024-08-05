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

import Link from "next/link";
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
import { Dialog, DialogHeader, DialogContent } from "@/components/ui/dialog";

//UI needed
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUp } from "lucide-react";
import { EditIcon } from "lucide-react";

//Values and utils
import { debounce, promedioCalculator } from "@/utils/index";

//Types:
import { ValueObject, AnalisysCatalogs, AnalisysInitialValues } from "@/index";

import Loading from "../shared/Loading";

interface AnalysisFormProps {
  type: "cual" | "cuant";
  mode: "add" | "edit-both" | "edit-cual" | "edit-cuant";

  data: AnalisysCatalogs;
  initialValues: AnalisysInitialValues | null;
  cualId: number | null;
  cuantId: number| null;
}

const AnalysisForm = ({
  type,
  mode,
  data,
  initialValues,
  cuantId, 
  cualId
}: AnalysisFormProps) => {

 const [buttonCual, setButtonCual] = useState(false);
 const [buttonCuant, setButtonCuant] = useState(false);

  const { setCaulitativePromedio, cualitativePromedio } = useAverages();
  const initialPromedioCual = mode === "add" ? 0 : cualitativePromedio/2;
  const [cualitativeValues, setCualitativeValues] = useState<number>(initialPromedioCual);
  
  const { setCuantitativePromedio, cuantitativePromedio } = useAverages();
  const initialPromedioCuant = mode === "add" ? 0 : cuantitativePromedio/2;
  const [cuantitativeValues, setCuantitativeValues] = useState<number>(initialPromedioCuant);
  
  const [success, setSuccess] = useState(false);
  const [bigSuccess, setBigSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //For the initial values
  const a = initialValues?.filteredCualitative;
  const b = initialValues?.filteredCuantitative;

  const initialValuesForm =
    (mode === "edit-both" || mode === "edit-cual" || mode === "edit-cuant") &&
    a &&
    b
      ? type === "cual"
        ? {
            alianzas: a.alianzas,
            auditorias: a.auditoria,
            equipo: a.integrantesEquipo,
            financeCual: a.financiamiento,
            whitepaper: a.whitepapaer,
            roadmap: a.roadmap,
            comunidad: a.comunidad,
            casosUso: a.caso_uso,
            tokenomics: [0],
            onChain: [0],
            finance: [0],
            exchange: [0],
          }
        : {
            tokenomics: b.tokenomics,
            onChain: b.onChain,
            finance: b.finance,
            exchange: b.exchange,
          }
      : //If mode is add
        {
            alianzas: [],
            auditorias: [],
            equipo: [],
            financeCual: [],
            whitepaper: [],
            roadmap: [],
            comunidad: [],
            casosUso: [],
            tokenomics: [],
            onChain: [],
            finance: [],
            exchange: [],
        }

  // useEffect(() => {
  //   setCaulitativePromedio(a?.promedio ?? 0);
  //   setCuantitativePromedio(b?.promedio ?? 0);
  // }, []);
  //Defining the form
  const form = useForm({
    defaultValues: initialValuesForm,
  });

  //Para calcular promedio de cualitativos
  useEffect(() => {
    const debouncedFunction = debounce(() => {
      if (cualitativeValues > 0) {
        setCaulitativePromedio(cualitativeValues * 2);
      }
    }, 500);

    if (cualitativeValues) {
      debouncedFunction();
    }
    console.log("Cualitative Values", cualitativeValues);
    return () => debouncedFunction.cancel();
  }, [cualitativeValues]);

  //Para calcular promedio de cuantitativos
  useEffect(() => {
    const debouncedFunction = debounce(() => {
      if (cuantitativeValues > 0) {
        setCuantitativePromedio(cuantitativeValues * 2);
      }
    }, 500);

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
          const response = await handleCreateAnalisys(
            values,
            guzma,
            projectId,
            type
          );
          console.log("Response", response);
          if (response) {
            // Primero, mostrar el mensaje de éxito
            setSuccess(true);
            if(type === "cual"){
              setButtonCual(true);
            }
            if(type === "cuant"){
              setButtonCuant(true);
            }
            // Luego, después de 1 segundo, ocultar el mensaje
            setTimeout(() => {
              setSuccess(false);
            }, 2500);
            setIsLoading(false); // Ajusta este tiempo según sea necesario
          }
          // setIsLoading(false);
        
        } else if (mode === "edit-cual") {
          if (type === "cuant") {
            const response = await handleCreateAnalisys(
              values,
              guzma,
              projectId,
              type,
            );
            if (response) {
              // Primero, mostrar el mensaje de éxito
              setSuccess(true);
              // Luego, después de 1 segundo, ocultar el mensaje
              setTimeout(() => {
                setSuccess(false);
              }, 2500);
              setIsLoading(false); // Ajusta este tiempo según sea necesario
            }
          } else {
            const response = await handleUpdateAnalisys(
              values,
              guzma,
              projectId,
              type,
              cualId??0
            );
            if (response) {
              // Primero, mostrar el mensaje de éxito
              setSuccess(true);
              // Luego, después de 1 segundo, ocultar el mensaje
              setTimeout(() => {
                setSuccess(false);
              }, 2500);
              setIsLoading(false); // Ajusta este tiempo según sea necesario
            }
          }
        } else if (mode === "edit-cuant") {
          if (type === "cual") {
            const response = await handleCreateAnalisys(
              values,
              guzma,
              projectId,
              type,
            );
            if (response) {
              // Primero, mostrar el mensaje de éxito
              setSuccess(true);
              // Luego, después de 1 segundo, ocultar el mensaje
              setTimeout(() => {
                setSuccess(false);
              }, 2500); 
              setIsLoading(false);// Ajusta este tiempo según sea necesario
            }
          } else {
            const response = await handleUpdateAnalisys(
              values,
              guzma,
              projectId,
              type,
              cuantId??0
            );
            if (response) {
              // Primero, mostrar el mensaje de éxito
              setSuccess(true);
              // Luego, después de 1 segundo, ocultar el mensaje
              setTimeout(() => {
                setSuccess(false);
              }, 2500); 
              setIsLoading(false);// Ajusta este tiempo según sea necesario
            }
          }
        } 
        else {
          console.log(cuantId)
          const analisysId = type === "cual" ? cualId : cuantId;
          console.log("analisis: ", analisysId);
          

          const response = await handleUpdateAnalisys(
            values,
            guzma,
            projectId,
            type,
            analisysId??0
          );
          console.log("Response", response);
          if (response) {
            // Primero, mostrar el mensaje de éxito
            setSuccess(true);
            // Luego, después de 1 segundo, ocultar el mensaje
            setTimeout(() => {
              setSuccess(false);
            }, 2500);
            setIsLoading(false); // Ajusta este tiempo según sea necesario
          }
          
        }
      }
     
    }

    //backend Values para cualitativo
   {
    if (type === "cual") {
      console.log('llego aca?')
      const backendValues = {
        idCasoUso: values.casosUso,
        idIntegrantesEquipo: values.equipo,
        idAuditoria: values.auditorias,
        idRoadmap: values.roadmap,
        idComunidad: values.comunidad,
        idFinanciamiento: values.financeCual,
        idWhitepapaers: values.whitepaper,
        idAlianzas: values.alianzas,
        suma: cualitativePromedio,
      };
      console.log("Backend Values", backendValues);

      submitHandler(backendValues);
    } else {
      const backendValues = {
        idTokenomic: values.tokenomics,
        idMovimientosOnChain: values.onChain,
        idMetricasExchange: values.exchange,
        idFinanciamiento: values.finance,
        suma: cuantitativePromedio,
      };
      console.log("Backend Values", backendValues);
      submitHandler(backendValues);
    }}
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        
        


        <div
          className={`z-50 fixed bottom-16 xl:bottom-28 right-5 bg-primary text-white py-2 px-4 rounded-lg shadow-lg
            transition-opacity duration-2500 ${success ? "opacity-100" : "opacity-0"}`}
          onAnimationEnd={() => setSuccess(false)}
        >
          Subido exitosamente!
          
        </div>

        <div className="grid gap-4">
          {
          type === "cual" ? (
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
            />)}
          
        </div>
        {isLoading && <Loading />}
        <Button type="submit"
          variant={mode === "add" ? "outline" : "default"}
          size={'sm'}
        className={` 
             w-4/12 md:w-2/12 fixed right-[-50px] z-30 md:right-[4.5rem]  2xl:right-36 justify-start md:justify-center mx-auto mt-4 text-left
          ${ type === 'cual' && 'top-[8.35rem] md:top-[5.5rem]'} 
          ${type === 'cuant' && 'top-44 md:top-32 md:z-30' }
          ${(type === 'cuant' && buttonCuant) && 'hidden'}
          ${(type === 'cual' && buttonCual) && 'hidden'}
          `}
          
          >
            {
              mode === "add" &&
              <ArrowUp />
            }

            {
              mode ===  "edit-both" && 
              <EditIcon />
            }
          
          { type === 'cuant' ? 'Cuantitativo' : 'Cualitativo'
          }
        </Button>
      </form>
    </Form>
  );
};

export default AnalysisForm;
