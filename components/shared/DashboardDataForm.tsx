"use client"
import React, {useEffect, useState} from "react"
import { get4t, getDecision, getExchange, getSectores } from "@/services/backend/catalogos"
import { useUserData, useUserTableData } from "@/hooks/useUserData"
//Shadcn staff for forms
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form
  } from "@/components/ui/form"

//UI needed
import { Button } from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { CustomField } from "./CustomField"

//Data for default values
const defaultValues = {
    nombre: "",
    ticket: "",
    id4e: "",
    id_decision_proyecto: "",
    marketCap: 0,
    siAth: 0,
    idExchange: '',
    idSector: '',
    precioEntrada: 0,
    precioActual: 0,
  };
//Debounce
import { debounce } from "@/lib/utils"
//Schema
export const formSchema = z.object({
    nombre: z.string({ required_error: "El campo 'Nombre' no puede estar vacío." }),
    ticket: z.string({ required_error: "El campo 'ticket' no puede estar vacío." }),
    id4e: z.string({ required_error: "El campo '4E' no puede estar vacío." }),
    id_decision_proyecto: z.string({ required_error: "El campo 'Decision' no puede estar vacío." }),
    marketCap: z.number().nonnegative("El campo 'Market Cap' debe ser un número."),
    siAth: z
      .number()
      .nonnegative("El campo 'Si Ath' debe ser un número.")
      .min(1, "El campo 'Si Ath' debe ser mayor o igual a 1.")
      .max(100, "El campo 'Si Ath' debe ser menor o igual a 100.")
      .refine(value => {
        const decimalPart = value.toString().split(".")[1];
        return !decimalPart || decimalPart.length <= 2;
      }, "El campo 'Si Ath' debe tener hasta dos decimales."),
    idExchange: z.string({ required_error: "El campo 'exchange' no puede estar vacío." }),
    idSector: z.string({ required_error: "El campo 'sector' no puede estar vacío." }),
    precioEntrada: z.number().nonnegative("El campo 'precio' debe ser un número."),
    precioActual: z.number().nonnegative("El campo 'precio' debe ser un número."),
  });

//Types:
interface DashboardDataFormProps {
    type: "create" | "update"; 
    data: {
        nombre: string,
        ticket: string,
        id4e: string,
        id_decision_proyecto: string,
        marketCap: number,
        siAth: number,
        idExchange: string,
        idSector: string,
        precioEntrada: number,
        precioActual: number,
    } | null;
}
interface BackendValues{
    nombre: string,
    ticket: string,
    id4e: number,
    id_decision_proyecto: number,
    marketCap: number,
    siAth: number,
    idExchange: number,
    idSector: number,
    precioEntrada: number,
    precioActual: number,
    idUsuario: number | null
}
//El coso de actions
import { handleSubmitProyectForm } from "@/actions/postProyect"
//type of the data
type DataType = {
    value: number;
    label: string;
};


//The form
const DashboardDataForm = ({type, data = null}: DashboardDataFormProps) => {
    const {userId} = useUserData();
    const {setUserTableData} = useUserTableData();

    //Data generated after blur on name
    const [dataAfterBlur, setDataAfterBlur] = useState({
        ticket: '',
        
        marketCap: 0,
        siAth: 0,
        
        precioEntrada: 0,
        precioActual: 0
    });
    //For the form options to select
    const [data4t, setData4t] = useState<DataType[]>([]);
    const [decision, setDecision] = useState<DataType[]>([]);
    const [exchange, setExchange] = useState<DataType[]>([]);
    const [sector, setSector] = useState<DataType[]>([]);
    //Getting the data
    useEffect(() => {
        const fetchData = async () => {
            const data4t = await get4t();
            const decision = await getDecision();
            const exchange = await getExchange();
            const sector = await getSectores();
            
            
            setData4t(data4t);
            setDecision(decision);
            setExchange(exchange);
            setSector(sector);
        } 
        fetchData();
    }, []);

    const initialValues = data && type === 'update' ? {
        nombre: data?.nombre, 
        ticket: data?.ticket,
        id4e: data?.id4e,
        id_decision_proyecto: data?.id_decision_proyecto,
        marketCap: data?.marketCap,
        siAth: data?.siAth,
        idExchange: data?.idExchange,
        idSector: data?.idSector,
        precioEntrada: data?.precioEntrada,
        precioActual: data?.precioActual,
    } : defaultValues;

    //Defining the form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues
    })
      // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
            async function dora (){
                const backendValues: BackendValues = {
                    nombre: values.nombre,
                    ticket: values.ticket,
                    id4e: Number(values.id4e),
                    id_decision_proyecto: Number(values.id_decision_proyecto),
                    marketCap: values.marketCap,
                    siAth: values.siAth,
                    idExchange: Number(values.idExchange),
                    idSector: Number(values.idSector),
                    precioEntrada: values.precioEntrada,
                    precioActual: values.precioActual,
                    idUsuario: userId
                }
                console.log(backendValues)
                const newData = await handleSubmitProyectForm(backendValues, userId);
                console.log('Nueva Data dentro del frontend', newData)
                if(newData){
                    setUserTableData(newData);
                }
            }
            dora();
    }
    // const nameLostFocus = (e: any) => {
    //     setDataAfterBlur(
    //         {
    //             ticket: 'oneTicket',
               
    //             marketCap: 251200,
    //             siAth: 10,
                
    //             precioEntrada: 20000000,
    //             precioActual: 50000000
    //         }
    //     )
        

    // }
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} action="">
            <div className="space-y-6 md:grid grid-flow-row grid-cols-3 gap-6">
                {/**Name */}
                <CustomField
                    
                    control={form.control}
                    name='nombre'
                    formLabel='Nombre'
                    className='w-full sm:mt-6'
                    render={({field}) => (
                        <Input {...field}  />
                    )}
                />
                {/**Ticket */}
                <CustomField
                     
                    control={form.control}
                    name='ticket'
                    formLabel='Ticket'
                    className='w-full'
                    render={({field}) => (
                        <Input {...field}  maxLength={5}/>
                    )}
                />
                {/**4E */}
                <CustomField
                     
                    control={form.control}
                    name='id4e'
                    formLabel='4E'
                    className='w-full'
                    render={({field}) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value} >
                 
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el 4E" />
                    </SelectTrigger>
                  
                  <SelectContent>
                    { data4t.map((metodo) => (
                      <SelectItem key={metodo.value} value={String(metodo.value)}>
                        <Badge
                          variant="fourE"
                          color={
                            metodo.label === "Evaluar"
                          ? "yellow"
                          : metodo.label === "Encontrar"
                          ? "grey"
                          : metodo.label === "Estudiar"
                          ? "blue"
                          : "green"
                          }
                        >
                          {metodo.label}
                        </Badge>
                      </SelectItem>
                    ))}

                  </SelectContent>
                </Select>
                    )}
                />
                {/**Decision */}
                <CustomField
                     
                    control={form.control}
                    name='id_decision_proyecto'
                    formLabel='Decision'
                    className='w-full'
                    render={({field}) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                  
                            <SelectTrigger>
                            <SelectValue placeholder="Decision sobre el proyecto" />
                            </SelectTrigger>
                 
                            <SelectContent>
                                { decision.map((decision) => (
                                <SelectItem key={decision.value} value={String(decision.value)}>
                                
                                    <Badge
                                    variant={
                                        decision.label === "Watchlist"
                                    ? "decisionWatchlist"
                                    : decision.label === "Descartar"
                                    ? "desicionLeave"
                                    : "desicionInvest"
                                    }
                                    >
                                    {decision.label}
                                    </Badge>
                                </SelectItem>
                                ))}
                                
                            </SelectContent>
                        </Select>
                )}
                />
                
                {/**Market Cap */}
                <CustomField
                     
                    control={form.control}
                    name='marketCap'
                    formLabel='marketCap'
                    className='w-full'
                    render={({field}) => (
                          <Input {...field} type="number" 
                            
                          onChange={e => field.onChange(parseFloat(e.target.value))}  
                        />
                    )}
                />
                {/**Si Ath */}
                <CustomField
                     
                    control={form.control}
                    name='siAth'
                    formLabel='siAth'
                    className='w-full'
                    render={({field}) => (
                        <Input {...field} type="number" step='0.01' min='0' max='100' 
                            
                            onChange={e => field.onChange(parseFloat(e.target.value))}
                        />
                    )}
                />
                {/**Exchange */}
                <CustomField
                     
                    control={form.control}
                    name='idExchange'
                    formLabel='Exchange'
                    className='w-full'
                    render={({field}) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
              
                            <SelectTrigger>
                            <SelectValue placeholder="Selecciona el exchange" />
                            </SelectTrigger>
                        
                        <SelectContent>
                            {exchange.map((exchange) => (
                            <SelectItem key={exchange.value} value={String(exchange.value)}>
                                <Badge>
                                {exchange.label}
                                </Badge>
                            </SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                    )}
                />
                {/**Sector */}
                <CustomField
                     
                    control={form.control}
                    name='idSector'
                    formLabel='sector'
                    className='w-full'
                    render={({field}) => (
                        <Select onValueChange={field.onChange}  defaultValue={field.value}>
               
                        <SelectTrigger>
                            <SelectValue placeholder="Selecciona el sector" />
                        </SelectTrigger>
                        
                        <SelectContent>
                        {sector.map((sector) => (
                            <SelectItem key={sector.value} value={String(sector.value)}>
                            <Badge>
                            {sector.label}
                            </Badge>
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    )}
                />
                {/**Precio entrada */}
                <CustomField
                     
                    control={form.control}
                    name='precioEntrada'
                    formLabel='Precio entrada'
                    className='w-full'
                    render={({field}) => (
                        <Input {...field} type="number" 
                        
                        onChange={e => field.onChange(parseFloat(e.target.value))}
                        />
                    )}
                />
                {/**Precio actual */}
                <CustomField
                     
                    control={form.control}
                    name='precioActual'
                    formLabel='Precio actual'
                    className='w-full'
                    render={({field}) => (
                        <Input {...field} type="number" 
                        
                        onChange={e => field.onChange(parseFloat(e.target.value))}
                        />
                    )}
                />
                    
                  
            </div>

            {/*botones*/}
            <div className="flex justify-center mt-8">
                <Button type="submit" variant='secondary' className="w-1/5 font-bold">
                    {
                        type === 'create' ? 'Añadir' : 'Actualizar'
                    }
                </Button>
            </div>
        </form>
    
    </Form>
  )
}


export default DashboardDataForm