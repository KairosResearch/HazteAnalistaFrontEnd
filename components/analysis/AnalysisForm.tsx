"use client";

//Imports for the component
//React
import React, { useState, useEffect } from "react";
//Hooks
import { useUserTableData } from "@/hooks/useUserData";
import { useDialogItem, useDialogInstructions } from "@/hooks/useDialogs";
//import { useTabsState } from "@/hooks/useTabs";

//Types:
import { AnalisysCatalogs, BackendValues, CatalogosType, DashboardDataFormProps } from "@/index";

//Server actions for both adding and updating
import {
  handleSubmitProyectForm,
  handleUpdateProyect,
} from "@/actions/proyectActions";
import CualitativeFields from "./CualitativeFields";
import CuantitativeFields from "./CuantitativeForm";



//Shadcn staff for forms
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

//UI needed
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


//Values and utils
import {
  debounce,
  promedioCalculator,
} from "@/utils/index";


//Types: 
interface AnalysisFormProps {
    type: "cual" | "cuant";
    mode: "add" | "edit";
    // data?: BackendValues;
    // catalogos: CatalogosType;
    // mode: "add" | "edit";
    data: AnalisysCatalogs;
}

const AnalysisForm = (
    {type, mode, data}: AnalysisFormProps
) => {

    const [valuesToCalculate, setValuesToCalculate] = useState<number[]>([]);
    const [promedio, setPromedio] = useState<any>(0);


    const initialValues = 
    type === "cual" ? 
     {
        alianzas: 0,
        auditorias: 0,
        equipo: 0,
        financeCual: 0,
        whitepaper: 0,
        roadmap: 0,
        comunidad: 0,
        casosUso: 0,
        tokenomics: 0,
        onChain: 0,
        finance: 0,
        exchange: 0
        
    } : {
        tokenomics: 0,
        onChain: 0,
        finance: 0,
        exchange: 0,
    };

    
    //Defining the form
    const form = useForm({
        defaultValues: initialValues,
    });
    
    //Para calcular promedios
    useEffect(() => {
        const debouncedFunction = debounce(() => {
            if (valuesToCalculate.length > 0){
                const valoresFiltrados = valuesToCalculate.filter(valor => valor !== undefined);
                console.log("Values to calculate", valuesToCalculate);
                const promedio = promedioCalculator(valoresFiltrados);
                setPromedio(promedio);
            }

            
          }, 900);
      
          if (valuesToCalculate) {
            debouncedFunction();
          }
      
          return () => debouncedFunction.cancel();
    }, [valuesToCalculate]);
    
    
  // Submit handler
async function onSubmit(values: any) {
    const convertedValues = Object.keys(values).reduce((acc: any, key) => {
        acc[key] = Number(values[key]);
        return acc;
    }, {});

    console.log("Converted Values", convertedValues);
};

    return (
        <Form {...form}>
            <div>{promedio}%</div>
            <form  onSubmit={form.handleSubmit(onSubmit)}>
                
                <div className="grid gap-4">
                {
                    type === "cual" ? (
                        <CualitativeFields mode={mode} data={data} setValuesToCalculate={setValuesToCalculate}/>
                    ) : (
                        <CuantitativeFields mode={mode} data={data} setValuesToCalculate={setValuesToCalculate}/>
                    )
                } 

                </div>
            

                <Button type="submit" className="w-3/12 float-right  mx-auto mt-4">
                    Enviar
                </Button>

            </form>

        </Form>
    )
};


export default AnalysisForm;