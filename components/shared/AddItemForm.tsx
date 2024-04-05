"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"

import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectSeparator } from "../ui/select"
//Data
import {tickets, exchange, sector, metodo, decision} from "@/lib/data"



const FormSchema = z.object({
  ticket: z.string({ required_error: "El campo 'ticket' no puede estar vacío." }),
  fourE: z.string({ required_error: "El campo '4E' no puede estar vacío." }),
  Decision: z.string({ required_error: "El campo 'Decision' no puede estar vacío." }),
  MarketCap: z.number().nonnegative("El campo 'Market Cap' debe ser un número."),
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

export function AddItemForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ticket: '',
      fourE: '',
      Decision: '',
      MarketCap: 0,
      exchange: '',
      sector: '',
      precioEntrada: 0,
      precioActual: 0,
      siAth: 0,
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
                      <>
                        <SelectItem key={ticket.id} value={ticket.ticket}>
                        + {ticket.ticket}
                      </SelectItem>
                      <SelectSeparator />
                      </>
                      
                    ))}
                  </SelectContent>
                </Select>
            </FormControl>

            
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

      {/*******SiAth **********/}


    <FormField
            name="siAth"
            control={form.control}
            render={({ field }) => (
              <FormItem className="">
                <FormLabel htmlFor="siAthp">Si Ath</FormLabel>
                <FormControl>
                  <Input {...field} type="number" step='0.01' min='0'/>
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
            
              <Select onValueChange={field.onChange} defaultValue={field.value}>
               
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el sector" />
                  </SelectTrigger>
                </FormControl>
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
            
          </FormItem>
        )}
      />


      {/*******Precio Entrada**********/}

      <FormField
          name="precioEntrada"
          control={form.control}
          render={({ field }) => (
            <FormItem className="">
              <FormLabel htmlFor="precio">Precio Entrada</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
            </FormItem>
          )}
        />
        {/*******Precio Actual**********/}

        <FormField
          name="precioActual"
          control={form.control}
          render={({ field }) => (
            <FormItem className="">
              <FormLabel htmlFor="precio">Precio Actual</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <div className="flex justify-center mt-8">
        <Button type="submit" variant='secondary' className="w-1/5 font-bold">
          Añadir
        </Button>
      </div>
      
      </form>
    </Form>
  )
}
