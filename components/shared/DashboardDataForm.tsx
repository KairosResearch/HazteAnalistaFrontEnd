"use client"
//Shadcn staff for forms
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
  } from "@/components/ui/form"

//UI needed
import { Button } from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectSeparator } from "../ui/select"
import { CustomField } from "./CustomField"
//import CustomField from "@/components/shared/CustomField"
//Data
import {tickets, exchange, sector, metodo, decision} from "@/lib/data"
//Data for default values
const defaultValues = {
    name: "",
    ticket: "",
    fourE: "",
    Decision: "",
    marketCap: 0,
    siAth: 0,
    exchange: "",
    sector: "",
    precioEntrada: 0,
    precioActual: 0,
  };
//Debounce
import { debounce } from "@/lib/utils"
//Schema
export const formSchema = z.object({
    name: z.string({ required_error: "El campo 'Nombre' no puede estar vacío." }),
    ticket: z.string({ required_error: "El campo 'ticket' no puede estar vacío." }),
    fourE: z.string({ required_error: "El campo '4E' no puede estar vacío." }),
    Decision: z.string({ required_error: "El campo 'Decision' no puede estar vacío." }),
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
    exchange: z.string({ required_error: "El campo 'exchange' no puede estar vacío." }),
    sector: z.string({ required_error: "El campo 'sector' no puede estar vacío." }),
    precioEntrada: z.number().nonnegative("El campo 'precio' debe ser un número."),
    precioActual: z.number().nonnegative("El campo 'precio' debe ser un número."),
  });

//Types:
interface DashboardDataFormProps {
    type: "create" | "update"; 
    data: {
        name: string,
        ticket: string,
        fourE: string,
        decision: string,
        marketCap: number,
        siAth: number,
        exchange: string,
        sector: string,
        precioEntrada: number,
        precioActual: number,
    } | null;
}

//The form
const DashboardDataForm = ({type, data = null}: DashboardDataFormProps) => {
    const initialValues = data && type === 'update' ? {
        ticket: data?.ticket,
        fourE: data?.fourE,
        decision: data?.decision,
        marketCap: data?.marketCap,
        siAth: data?.siAth,
        exchange: data?.exchange,
        sector: data?.sector,
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
    /*
    if(action === 'update') {
      const newImageToUpload = {
        ...data,
        _id: data._id,
      }
    */
      console.log('Nuevo item: ', {values})
  }
  
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} action="">
            <div className="space-y-6 md:grid grid-flow-row grid-cols-3 gap-6">
                {/**Name */}
                <CustomField 
                    control={form.control}
                    name='name'
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
                        <Input {...field} maxLength={5}/>
                    )}
                />
                {/**4E */}
                <CustomField 
                    control={form.control}
                    name='fourE'
                    formLabel='4E'
                    className='w-full'
                    render={({field}) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                 
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el 4E" />
                    </SelectTrigger>
                  
                  <SelectContent>
                    { metodo.map((metodo) => (
                      <SelectItem key={metodo.id} value={metodo.title}>
                        <Badge
                          variant="fourE"
                          color={
                            metodo.title === "Evaluar"
                          ? "yellow"
                          : metodo.title === "Encontrar"
                          ? "grey"
                          : metodo.title === "Estudiar"
                          ? "blue"
                          : "green"
                          }
                        >
                          {metodo.title}
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
                    name='Decision'
                    formLabel='Decision'
                    className='w-full'
                    render={({field}) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                  
                            <SelectTrigger>
                            <SelectValue placeholder="Decision sobre el proyecto" />
                            </SelectTrigger>
                 
                            <SelectContent>
                                { decision.map((decision) => (
                                <SelectItem key={decision.id} value={decision.title}>
                                    <Badge
                                    variant={
                                        decision.title === "Watchlist"
                                    ? "decisionWatchlist"
                                    : decision.title === "Descartar"
                                    ? "desicionLeave"
                                    : "desicionInvest"
                                    }
                                    >
                                    {decision.title}
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
                    name='exchange'
                    formLabel='exchange'
                    className='w-full'
                    render={({field}) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
              
                            <SelectTrigger>
                            <SelectValue placeholder="Selecciona el exchange" />
                            </SelectTrigger>
                        
                        <SelectContent>
                            {exchange.map((exchange) => (
                            <SelectItem key={exchange.id} value={exchange.title}>
                                <Badge>
                                {exchange.title}
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
                    name='sector'
                    formLabel='sector'
                    className='w-full'
                    render={({field}) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
               
                        <SelectTrigger>
                            <SelectValue placeholder="Selecciona el sector" />
                        </SelectTrigger>
                        
                        <SelectContent>
                        {sector.map((sector) => (
                            <SelectItem key={sector.id} value={sector.title}>
                            <Badge>
                            {sector.title}
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