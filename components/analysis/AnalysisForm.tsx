"use client";

//Imports for the component
//React
import React, { useState, useEffect } from "react";
//Hooks
import { useUserTableData } from "@/hooks/useUserData";
import { useDialogItem, useDialogInstructions } from "@/hooks/useDialogs";
//import { useTabsState } from "@/hooks/useTabs";

//Types:
import { BackendValues, CatalogosType, DashboardDataFormProps } from "@/index";

//Server actions for both adding and updating
import {
  handleSubmitProyectForm,
  handleUpdateProyect,
} from "@/actions/proyectActions";

//Shadcn staff for forms
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

//UI needed
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


//Values and utils
import {
  debounce,
  defaultValuesDashboardForm,
  rendimientoCalculator,
} from "@/utils/index";
import { CustomField } from "../shared/CustomField";

//Types: 
interface AnalysisFormProps {
    type: "cual" | "cuant";
    // data?: BackendValues;
    // catalogos: CatalogosType;
    // mode: "add" | "edit";
}

const AnalysisForm = (
    {type}: AnalysisFormProps
) => {
    const initialValues = 
     {
        campo1: "",
        campo2: "",
        campo3: "",
        campo4: "",
        campo5: "",
        campo6: "",
        campo7: "",
        campo8: "",
    };

    
    //Defining the form
    const form = useForm({
        defaultValues: initialValues,
    });
    // Submit handler
    async function onSubmit(values: any) {
        console.log("Values", values);
    };

    return (
        <Form {...form}>
            <form  onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-4">
                            <CustomField
                            type={type}
                            name="campo1"
                            formLabel=""
                            className=" w-full"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                    Casos de uso
                                    
                                </SelectTrigger>
                                <SelectContent>
                                    
                                    <SelectItem
                                    value={'Blalala'}
                                    >
                                        
                                        Blalal
                                        
                                    </SelectItem>
                                    
                                </SelectContent>
                                </Select>
                            )}
                        />
                        <CustomField
                            type={type}
                            name="campo1"
                            formLabel=""
                            className=" w-full"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                   Integrantes del equipo 
                                    
                                </SelectTrigger>
                                <SelectContent>
                                    
                                    <SelectItem
                                    value={'Blalala'}
                                    >
                                        
                                        Blalal
                                        
                                    </SelectItem>
                                    
                                </SelectContent>
                                </Select>
                            )}
                        />
                        <CustomField
                            type={type}
                            name="campo1"
                            formLabel=""
                            className=" w-full"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                   Roadmap
                                    
                                </SelectTrigger>
                                <SelectContent>
                                    
                                    <SelectItem
                                    value={'Blalala'}
                                    >
                                        
                                        Blalal
                                        
                                    </SelectItem>
                                    
                                </SelectContent>
                                </Select>
                            )}
                        />
                        <CustomField
                            type={type}
                            name="campo1"
                            formLabel=""
                            className=" w-full"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                   Auditorias
                                    
                                </SelectTrigger>
                                <SelectContent>
                                    
                                    <SelectItem
                                    value={'Blalala'}
                                    >
                                        
                                        Blalal
                                        
                                    </SelectItem>
                                    
                                </SelectContent>
                                </Select>
                            )}
                        />
                        <CustomField
                            type={type}
                            name="campo1"
                            formLabel=""
                            className=" w-full"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                   Comunidad
                                    
                                </SelectTrigger>
                                <SelectContent>
                                    
                                    <SelectItem
                                    value={'Blalala'}
                                    >
                                        
                                        Blalal
                                        
                                    </SelectItem>
                                    
                                </SelectContent>
                                </Select>
                            )}
                        />
                        <CustomField
                            type={type}
                            name="campo1"
                            formLabel=""
                            className=" w-full"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                   Financiamentos
                                    
                                </SelectTrigger>
                                <SelectContent>
                                    
                                    <SelectItem
                                    value={'Blalala'}
                                    >
                                        
                                        Blalal
                                        
                                    </SelectItem>
                                    
                                </SelectContent>
                                </Select>
                            )}
                        />
                        <CustomField
                            type={type}
                            name="campo1"
                            formLabel=""
                            className=" w-full"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                   Whitepapaer
                                    
                                </SelectTrigger>
                                <SelectContent>
                                    
                                    <SelectItem
                                    value={'Blalala'}
                                    >
                                        
                                        Blalal
                                        
                                    </SelectItem>
                                    
                                </SelectContent>
                                </Select>
                            )}
                        />
                        <CustomField
                            type={type}
                            name="campo1"
                            formLabel=""
                            className=" w-full"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                   Alianzas
                                    
                                </SelectTrigger>
                                <SelectContent>
                                    
                                    <SelectItem
                                    value={'Blalala'}
                                    >
                                        
                                        Blalal
                                        
                                    </SelectItem>
                                    
                                </SelectContent>
                                </Select>
                            )}
                        />

                </div>
            

                <Button type="submit" className="w-3/12 float-right  mx-auto mt-4">
                    Enviar
                </Button>

            </form>

        </Form>
    )
};


export default AnalysisForm;