"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { toast } from "@/components/ui/use-toast"
import { Input } from "../ui/input"
import { Checkbox } from "../ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
//Data
import {tickets, exchange, sector, metodo, decision, tipo} from "@/lib/data"



const FormSchema = z.object({
  ticket: z.string({ required_error: "El campo 'ticket' no puede estar vacío." }),
  tipo: z.string({ required_error: "El campo 'tipo' no puede estar vacío." }),
  fourE: z.string({ required_error: "El campo '4E' no puede estar vacío." }),
  Decision: z.string({ required_error: "El campo 'Decision' no puede estar vacío." }),
  MarketCap: z.number().nonnegative( "El campo 'market cap' debe ser un número." ),
  exchange: z.string({required_error: "El campo 'exchange' no puede estar vacío." }),
  sector: z.string({ required_error: "El campo 'sector' no puede estar vacío." }),
  precio: z.number().nonnegative( "El campo 'precio' debe ser un número." ),
});

export function EditionItemForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ticket: '',
      tipo: '',
      fourE: '',
      Decision: '',
      MarketCap: 0,
      exchange: '',
      sector: '',
      precio: 0,

    },

  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
      console.log(JSON.stringify(data, null, 2))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} >
        <div className="space-y-6 md:grid grid-flow-row grid-cols-3 gap-6 ">

        {/*******Ticket **********/}
      
      <FormField
        name="ticket"
        control={form.control}
        render={({ field }) => (
          <FormItem className=" mt-6">
            <FormLabel htmlFor="ticket" >
              Ticket
            </FormLabel>
            <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el ticket" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {tickets.map((ticket) => (
                      <SelectItem key={ticket.id} value={ticket.ticket}>
                        + {ticket.ticket}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
            </FormControl>

            
          </FormItem>
          )}
      />
      {/*******Tipo **********/}
      <FormField
        name="tipo"
        control={form.control}
        render={({ field }) => (
          <FormItem className="">
            <FormLabel htmlFor="precio">Tipo</FormLabel>
            
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    { tipo.map((tipo) => (
                      <SelectItem key={tipo.id} value={tipo.title}>
                        <Badge variant={(tipo.title === 'Reflexion') ? 'typeReflection' : (tipo.title === 'Narrativa') ? 'typeNarrative' :  'typeProyect'}>
                          {tipo.title}
                        </Badge>
                      </SelectItem>
                    ))}

                  </SelectContent>
                </Select>
            
          </FormItem>
        )}
      />

      {/*******4E **********/}

     <FormField
        name="fourE"
        control={form.control}
        render={({ field }) => (
          <FormItem className="">
            <FormLabel htmlFor="fourE">
              4E
            </FormLabel>
            <FormControl>

              <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el 4E" />
                    </SelectTrigger>
                  </FormControl>
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

            </FormControl>
          </FormItem>
          )}
      />


       {/*******Decision **********/}
      
      <FormField
        name="Decision"
        control={form.control}
        render={({ field }) => (
          <FormItem className="">
            <FormLabel htmlFor="Decision">Decision</FormLabel>

            <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Decision sobre el proyecto" />
                    </SelectTrigger>
                  </FormControl>
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
          

          </FormItem>
        )}
      />


      {/*******MarketCap **********/}


      <FormField
        name="MarketCap"
        control={form.control}
        render={({ field }) => (
          <FormItem className="">
            <FormLabel htmlFor="MarketCap">Market Cap</FormLabel>
            <FormControl>
              <Input {...field} type="number" />
            </FormControl>
          </FormItem>
        )}
      />

      {/*******Exchange **********/}


      <FormField
        name="exchange"
        control={form.control}
        render={({ field }) => (
          <FormItem className="">
        <FormLabel htmlFor="exchange">Exchange</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el exchange" />
                </SelectTrigger>
              </FormControl>
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
          </FormControl>
          </FormItem>
        )}
      />


      {/*******Sector **********/}

      
      <FormField
        name="sector"
        control={form.control}
        render={({ field }) => (
          <FormItem className="">
        <FormLabel htmlFor="sector">Sector</FormLabel>
            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="popover-trigger"
                  className={cn("w-full justify-between")}
                >
                  Sector
                </Button>
              </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0 ">
                  <div className="grid divide-y divide-slate-white">
                    <div className="p-1">
                      <Badge>Hola</Badge>
                    </div>
                    <div className="p-2">
                      <span className="text-xs block"> Seleccionar opcion</span>
                      <div className="">
                    {sector.map((sector) => (
                      <FormField
                        control={form.control}
                        name="sector"
                        render={({ field }) => {
                      return (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-3">
                          <FormControl>
                        <Checkbox className="mt-3" {...field} />
                          </FormControl>
                          <FormLabel className="font-normal">
                        <Badge>{sector.title}</Badge>
                          </FormLabel>
                        </FormItem>
                      );
                        }}
                      />
                    ))}
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </FormControl>
          </FormItem>
        )}
      />

           {/*******Precio **********/}

      <FormField
        name="precio"
        control={form.control}
        render={({ field }) => (
          <FormItem className="">
            <FormLabel htmlFor="precio">Precio</FormLabel>
            <FormControl>
              <Input {...field} type="number" />
            </FormControl>
          </FormItem>
        )}
      />
      </div>
      <div className="flex justify-center mt-8">
        <Button type="submit" variant='secondary' className="w-1/5">
          Añadir
        </Button>
      </div>
      
      </form>
    </Form>
  )
}
