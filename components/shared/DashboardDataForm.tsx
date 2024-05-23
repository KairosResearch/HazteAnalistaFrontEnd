"use client"
import React, {useState} from "react"
//Hooks
import { useUserTableData } from "@/hooks/useUserData"
import { usePrivy } from "@privy-io/react-auth"
//Types:
import { BackendValues, CatalogosType, DashboardDataFormProps,  TableData } from "@/index"

//El coso de actions
import { handleSubmitProyectForm, handleUpdateProyect } from "@/actions/proyectActions"

//Shadcn staff for forms
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"

//UI needed
import { Button } from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { CustomField } from "./CustomField"

//Values
import {defaultValuesDashboardForm, randomMarketCap} from "@/utils/index"


//Schema
export const formSchema = z.object({
    nombre: z.string({ required_error: "El campo 'Nombre' no puede estar vacío." }),
    ticket: z.string({ required_error: "El campo 'ticket' no puede estar vacío." }),
    id4e: z.string({ required_error: "El campo '4E' no puede estar vacío." }),
    id_decision_proyecto: z.string({ required_error: "El campo 'Decision' no puede estar vacío." }),
    marketCap: z.number().nonnegative("El campo 'Market Cap' debe ser un número."),
    siAth: z
      .number()
      .nonnegative("El campo 'Si Ath' debe ser un número."),
    idExchange: z.string({ required_error: "El campo 'exchange' no puede estar vacío." }),
    idSector: z.string({ required_error: "El campo 'sector' no puede estar vacío." }),
    precioEntrada: z.number().nonnegative("El campo 'precio' debe ser un número."),
    precioActual: z.number().nonnegative("El campo 'precio' debe ser un número."),
  });





//The form
const DashboardDataForm = ({type, data = null, catalogos, close}: DashboardDataFormProps) => {
    const data4t = catalogos[0] as CatalogosType[]; 
    const decision = catalogos[1] as CatalogosType[];
    const exchange = catalogos[2] as CatalogosType[];
    const sector = catalogos[3] as CatalogosType[];

    const {user, getAccessToken} = usePrivy();


    const getPrivyAccessToken = async () => {
        const accessToken = await getAccessToken();
        return accessToken;
    }

    const [count, setCount] = useState(1);

    const [submitted, setSubmitted] = useState(false);
    const [emptyForm, setEmptyForm] = useState(false);

    // const {userId} = useUserData();
    const {setUserTableData} = useUserTableData();

 
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
    } : defaultValuesDashboardForm;


    //Defining the form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues
    })

    

    //Data generated after blur on name
    // const {setValue, getValues} = useForm()
    // const nameLostFocus = () => {
    //     // setValue('ticket', 'TIA')
    //     // setValue('marketCap', randomMarketCap())
    //     // setValue('siAth', 2.02)
    //     // setValue('precioEntrada', 11)
    //     // setValue('precioActual', 10.36)
    // }



      // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        if(type === 'create'){
            setEmptyForm(false);

            //These are the values created after the name lost focus
            // const valuesGot = getValues();
            
            //These are the values that will be sent to the backend
            //Both the values that got from the form and the values that were generated after the name lost focus 
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
            }
            
            if (Object.values(backendValues).every(value => value)) {
                console.log('Datos' , backendValues)
                const token  = await getPrivyAccessToken();
                console.log('access token de privy: ', token)
                console.log('Id del usuario: ', user?.id)
                // const newData = await handleSubmitProyectForm(backendValues, token, user?.id);
                // console.log('Nueva Data dentro del frontend', newData)
                // if(newData){
                //     setCount(count + 1);
                //     setUserTableData(['Dato añadido' + count]);
                //     setSubmitted(true);
                   
                //    form.reset();
                //    form.reset(defaultValuesDashboardForm);
                 
                //    if (close) {
                //        close();
                //    }
                // }
            } else {
               console.log('Datos null')
               setEmptyForm(true);
            }
        } else {
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
            }
            const newData = await handleUpdateProyect({...backendValues, id_proyecto: data?.id_proyecto});
            if(newData){
                
                setCount(count + 1);
                setUserTableData(['Cambio de datos' + count]);
                setSubmitted(true);
                form.reset();
                form.reset(defaultValuesDashboardForm);
                setTimeout(() => {
                    if (close) {
                        close()
                    }
                   }, 2000)
            }
        }

            
    }
    
return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} action="">
            {emptyForm && (
                <div className="mx-auto w-4/5 mt-6 hidden md:block">
                    <p className="bg-red-200 p-2 text-center text-red-700">
                        Por favor llena todos los campos
                    </p>
                </div>
            )}
            {submitted && (
                <>
                    <div className="mx-auto w-4/5 mt-6 hidden md:block">
                        <p className="bg-green-200 p-2 text-center text-green-700">
                            Proyecto enviado!
                        </p>
                    </div>
                </>
            )}
            <div className="space-y-6 md:grid grid-flow-row grid-cols-3 gap-6">
                {/**Name */}
                <CustomField
                    control={form.control}
                    name="nombre"
                    formLabel="Nombre"
                    className="w-full sm:mt-6"
                    render={({ field }) => (
                        <Input
                            {...field}
                            // onBlur={type === 'create'  ? () => {
                            //     field.onBlur();
                            //     nameLostFocus();
                            // }: undefined}
                        />
                    )}
                />
                {/**Ticket */}
                <CustomField
                    control={form.control}
                    name="ticket"
                    formLabel="Ticker"
                    className="w-full"
                    render={({ field }) => (
                        <Input
                            {...field}
                            maxLength={5}
                            
                            // value={type === 'create' ? getValues("ticket") : field.value}
                            value={field.value}
                        />
                    )}
                />
                {/**4E */}
                <CustomField
                    control={form.control}
                    name="id4e"
                    formLabel="4E"
                    className="w-full"
                    render={({ field }) => (
                        <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona el 4E" />
                            </SelectTrigger>
                            <SelectContent>
                                {data4t.map((metodo) => (
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
                    name="id_decision_proyecto"
                    formLabel="Decision"
                    className="w-full"
                    render={({ field }) => (
                        <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Decision sobre el proyecto" />
                            </SelectTrigger>
                            <SelectContent>
                                {decision.map((decision) => (
                                    <SelectItem
                                        key={decision.value}
                                        value={String(decision.value)}
                                    >
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
                    name="marketCap"
                    formLabel="Market Cap"
                    className="w-full"
                    render={({ field }) => (
                        <Input
                            {...field}
                            type="text"
                            value={
                                field.value.toLocaleString()
                            }
                            onChange={(e) => {
                                // Elimina los separadores de miles antes de llamar a field.onChange
                                const value = parseFloat(e.target.value.replace(/,/g, ""));
                                field.onChange(isNaN(value) ? "" : value);
                            }}
                        />
                    )}
                />
                {/**Si Ath */}
                <CustomField
                    control={form.control}
                    name="siAth"
                    formLabel="ATH"
                    className="w-full"
                    render={({ field }) => (
                        <Input
                            {...field}
                            type="number"
                            value={field.value}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                    )}
                />
                {/**Exchange */}
                <CustomField
                    control={form.control}
                    name="idExchange"
                    formLabel="Exchange"
                    className="w-full"
                    render={({ field }) => (
                        <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona el exchange" />
                            </SelectTrigger>
                            <SelectContent>
                                {exchange.map((exchange) => (
                                    <SelectItem
                                        key={exchange.value}
                                        value={String(exchange.value)}
                                    >
                                        <Badge>{exchange.label}</Badge>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />

                {/**Sector */}

                <CustomField
                    control={form.control}
                    name="idSector"
                    formLabel="Sector"
                    className="w-full"
                    render={({ field }) => (
                        <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona el sector" />
                            </SelectTrigger>
                            <SelectContent>
                                {sector.map((sector) => (
                                    <SelectItem
                                        key={sector.value}
                                        value={String(sector.value)}
                                    >
                                        <Badge>{sector.label}</Badge>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
                {/**Precio entrada */}
                <CustomField
                    control={form.control}
                    name="precioEntrada"
                    formLabel="Precio entrada"
                    className="w-full"
                    render={({ field }) => (
                        <Input
                            {...field}
                            type="number"
                            value={field.value}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                    )}
                />

                {/**Precio actual */}
                <CustomField
                    control={form.control}
                    name="precioActual"
                    formLabel="Precio actual"
                    className="w-full"
                    render={({ field }) => (
                        <Input
                            {...field}
                            type="number"
                            value={field.value}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                    )}
                />
            </div>

            {submitted && (
                <>
                    <div className="mx-auto w-4/5 mt-6 block md:hidden">
                        <p className="bg-green-200 p-2 text-center text-green-700">
                            Proyecto enviado!
                        </p>
                    </div>
                </>
            )}

            {emptyForm && (
                <div className="mx-auto w-4/5 mt-6 block md:hidden">
                    <p className="bg-red-200 p-2 text-center text-red-700">
                        Por favor llena todos los campos!
                    </p>
                </div>
            )}

            {/*Botones*/}

            <div className="flex justify-center mt-8">
                <Button
                    type="submit"
                    variant="secondary"
                    className={`w-4/5 font-bold`}
                >
                    {type === "create" ? "Añadir" : "Actualizar"}
                </Button>
            </div>
        </form>
    </Form>
);
}


export default DashboardDataForm