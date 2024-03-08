"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"



const FormSchema = z.object({
  language: z.string({
    required_error: "Please select a language.",
  }),
})

export function ComboboxForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Ticker</FormLabel>
              
                  <FormControl>
                    <input type="text" id="ticker" className="h-8" placeholder="Ticker" />
                  </FormControl>
                
              <FormLabel>4E</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      Elije tus 4E
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-2">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                          <Badge color="red">
                            Chao
                          </Badge>
                      </div>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                            <label htmlFor="width">Pendiente</label>
                            <Badge color="red">
                              Chao
                            </Badge>
                            <Badge color="red">
                              Chao
                            </Badge>
                            
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                            <label htmlFor="maxWidth">En curso</label>
                              <Badge 
                                color="red" 
                              >
                                Chao
                              </Badge>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                            <label htmlFor="height">Completado</label>
                            <Badge 
                              color="red"
                            >
                              Chao
                            </Badge>
                            </div>
                            
                        </div>
                    </div>
                </PopoverContent>
              </Popover>
              <FormLabel>Decision</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      Que vas a hacer?
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <div className="grid gap-4">
                    <div className="space-y-2">
                    <Badge 
                          color="red"
                        >
                          Chao
                        </Badge>
                        
                    </div>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                            <label htmlFor="width">Width</label>
                            <Badge color="red">
                              Chao
                            </Badge>
                            
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <label htmlFor="maxWidth">Max. width</label>
                            <Badge color="red">
                              Chao
                            </Badge>
                        </div>
                      </div> 
                    </div>
                </PopoverContent>
              </Popover>
              <FormLabel>Market Cap</FormLabel>
              
                  <FormControl>
                    <input type="text" id="Cap Market" className="h-8" placeholder="Cap Market" />
                  </FormControl>

              <FormLabel>Exchange</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      Elige el Exchange
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <div className="grid gap-4">
                    <div className="space-y-2">
                        <Badge color="red">
                          Chao
                        </Badge>
                    </div>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                            <label htmlFor="width">Width</label>
                            <Badge color="red">
                                Chao
                              </Badge>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                            <label htmlFor="maxWidth">Max. width</label>
                            <Badge color="red">
                                Chao
                              </Badge>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                            <label htmlFor="height">Height</label>
                            <Badge color="red">
                                Chao
                              </Badge>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                            <label htmlFor="maxHeight">Max. height</label>
                            <Badge color="red">
                                Chao
                              </Badge>
                            </div>
                        </div>
                    </div>
                </PopoverContent>
              </Popover>

              <FormLabel>Sector</FormLabel>

              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      Elige el sector
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <div className="grid gap-4">
                    <div className="space-y-2">
                        <Badge color="red">
                          Chao
                        </Badge>

                    </div>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                            <label htmlFor="width">Width</label>
                            <Badge color="red">
                                Chao
                              </Badge>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                            <label htmlFor="maxWidth">Max. width</label>
                            <Badge color="red">
                                Chao
                              </Badge>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                            <label htmlFor="height">Height</label>
                            <Badge color="red">
                                Chao
                              </Badge>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                            <label htmlFor="maxHeight">Max. height</label>
                            <Badge color="red">
                                Chao
                              </Badge>
                            </div>
                        </div>
                    </div>
                </PopoverContent>
              </Popover>


              <FormLabel>Precio</FormLabel>
              
                  <FormControl>
                    <input type="text" id="Precio" className="h-8" placeholder="Precio" />
                  </FormControl>

              
              <FormDescription>
                This is the language that will be used in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
