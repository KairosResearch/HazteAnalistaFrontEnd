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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 md:grid grid-flow-row grid-cols-3 gap-6 ">

        {/*******Ticket **********/}
      
      <FormField
        name="ticket"
        control={form.control}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel htmlFor="ticket" >
              TTicket
            </FormLabel>
            <FormControl>
              <Input  {...field}/>
            </FormControl>

            
          </FormItem>
          )}
      />
      {/*******Tipo **********/}
      <FormField
        name="tipo"
        control={form.control}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel htmlFor="precio">Tipo</FormLabel>
            
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="reflexion"><Badge>Reflexión</Badge></SelectItem>
                    <SelectItem value="narrativa"><Badge>Narrativa</Badge></SelectItem>
                    <SelectItem value="Proyecto"><Badge>Proyecto</Badge></SelectItem>
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
          <FormItem className="flex flex-col">
            <FormLabel htmlFor="fourE">
              4E
            </FormLabel>
            <FormControl>

            <Popover>
                <PopoverTrigger asChild>
                    <FormControl>
                        <Button
                            variant="outline"
                            role="popover-trigger"
                            className={cn("w-full justify-between", )} 
                        >4E</Button>
                    </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0 ">
                    <div className="grid divide-y divide-slate-white">
                        <div>
                            <Badge>Hola</Badge>
                        </div>
                        <div className="p-2">
                          <span className="text-xs block"> Pendiente</span>
                          <div className="grid grid-cols-3 gap-2 pt-2">
                            <Badge>Evaluar</Badge>
                            <Badge>Holakk </Badge>
                            <Badge>Hola</Badge>
                          </div>
                        </div>
                        <div className="p-2">
                          <span className="text-xs block"> En curso</span>
                          <div className="grid grid-cols-3 gap-2 pt-2">
                            <Badge>Evaluar</Badge>
                            <Badge>Holakk </Badge>
                            <Badge>Hola</Badge>
                          </div>
                        </div>
                        <div className="p-2">
                          <span className="text-xs block"> Completado</span>
                          <div className="grid grid-cols-3 gap-2 pt-2">
                            <Badge>Evaluar</Badge>
                            <Badge>Holakk </Badge>
                            <Badge>Hola</Badge>
                          </div>
                        </div>
                        <div className="p-2">
                          <span className="text-xs block"> Editar propiedad</span>
                          <div className="grid grid-cols-3 gap-2 pt-2">
                            <Badge>Evaluar</Badge>
                          </div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>

            </FormControl>
          </FormItem>
          )}
      />


       {/*******Decision **********/}
      
      <FormField
        name="Decision"
        control={form.control}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel htmlFor="Decision">Decision</FormLabel>
            <FormControl>
              <Popover>
                  <PopoverTrigger asChild>
                      <FormControl>
                          <Button
                              variant="outline"
                              role="popover-trigger"
                              className={cn("w-full justify-between", )} 
                          >Decision</Button>
                      </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 ">
                      <div className="grid divide-y divide-slate-white">
                          <div className="px-3 py-1">
                              <Badge>Hola</Badge>
                          </div>
                          <div className="p-2">
                            <span className="text-xs block"> Seleccionar opción</span>
                            <div className="pt-2">
                              <FormField
                                control={form.control}
                                name="Decision"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox {...field}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        <Badge>Watchlist</Badge>
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                              <FormField
                                control={form.control}
                                name="Decision"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox {...field}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        <Badge>Dejar</Badge>
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                              <FormField
                                control={form.control}
                                name="Decision"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox {...field}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                      <Badge> Invertir</Badge>
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            </div>
                          </div>
                          
                      </div>
                  </PopoverContent>
              </Popover>
            </FormControl>
          </FormItem>
        )}
      />


      {/*******MarketCap **********/}


      <FormField
        name="MarketCap"
        control={form.control}
        render={({ field }) => (
          <FormItem className="flex flex-col">
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
          <FormItem className="flex flex-col">
            <FormLabel htmlFor="exchange">Exchange</FormLabel>
            <FormControl>
              <Popover>
                  <PopoverTrigger asChild>
                      <FormControl>
                          <Button
                              variant="outline"
                              role="popover-trigger"
                              className={cn("w-full justify-between", )} 
                          >Exchange</Button>
                      </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 ">
                      <div className="grid divide-y divide-slate-white">
                          <div>
                              <Badge>Hola</Badge>
                          </div>
                          <div className="p-2">
                            <span className="text-xs block"> Seleccionar opcion</span>
                            <div className="pt-2">
                            <FormField
                              control={form.control}
                              name="exchange"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox {...field}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      <Badge>Watchlist</Badge>
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                            <FormField
                              control={form.control}
                              name="exchange"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox {...field}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      <Badge>Dejar</Badge>
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                            <FormField
                              control={form.control}
                              name="exchange"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox {...field}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                     <Badge> Invertir</Badge>
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                            </div>
                          </div>
                      </div>
                  </PopoverContent>
              </Popover>
            </FormControl>
          </FormItem>
        )}
      />


      {/*******Sector **********/}

      
      <FormField
        name="sector"
        control={form.control}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel htmlFor="sector">Sector</FormLabel>
            <FormControl>
              <Popover>
                    <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                                variant="outline"
                                role="popover-trigger"
                                className={cn("w-full justify-between", )} 
                            >Sector</Button>
                        </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 ">
                        <div className="grid divide-y divide-slate-white">
                            <div>
                                <Badge>Hola</Badge>
                            </div>
                            <div className="p-2">
                            <span className="text-xs block"> Seleccionar opcion</span>
                            <div className="pt-2">
                            <FormField
                              control={form.control}
                              name="exchange"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox {...field}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      <Badge>Watchlist</Badge>
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                            <FormField
                              control={form.control}
                              name="exchange"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox {...field}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      <Badge>Dejar</Badge>
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                            <FormField
                              control={form.control}
                              name="exchange"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox {...field}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                     <Badge> Invertir</Badge>
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
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
          <FormItem className="flex flex-col">
            <FormLabel htmlFor="precio">Precio</FormLabel>
            <FormControl>
              <Input {...field} type="number" />
            </FormControl>
          </FormItem>
        )}
      />
      <Button type="submit"  className="w-full">
        Editar
      </Button>
      </form>
    </Form>
  )
}
