"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

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
              <FormLabel>Language</FormLabel>
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
                      Hola
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Dimensions</h4>
                        <p className="text-sm text-muted-foreground">
                        Set the dimensions for the layer.
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                            <label htmlFor="width">Width</label>
                            <input
                                id="width"
                                defaultValue="100%"
                                className="col-span-2 h-8"
                            />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                            <label htmlFor="maxWidth">Max. width</label>
                            <input
                                id="maxWidth"
                                defaultValue="300px"
                                className="col-span-2 h-8"
                            />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                            <label htmlFor="height">Height</label>
                            <input
                                id="height"
                                defaultValue="25px"
                                className="col-span-2 h-8"
                            />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                            <label htmlFor="maxHeight">Max. height</label>
                            <input
                                id="maxHeight"
                                defaultValue="none"
                                className="col-span-2 h-8"
                            />
                            </div>
                        </div>
                    </div>
                </PopoverContent>
              </Popover>
              <FormLabel>Language</FormLabel>
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
                      Hola
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Dimensions</h4>
                        <p className="text-sm text-muted-foreground">
                        Set the dimensions for the layer.
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                            <label htmlFor="width">Width</label>
                            <input
                                id="width"
                                defaultValue="100%"
                                className="col-span-2 h-8"
                            />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                            <label htmlFor="maxWidth">Max. width</label>
                            <input
                                id="maxWidth"
                                defaultValue="300px"
                                className="col-span-2 h-8"
                            />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                            <label htmlFor="height">Height</label>
                            <input
                                id="height"
                                defaultValue="25px"
                                className="col-span-2 h-8"
                            />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                            <label htmlFor="maxHeight">Max. height</label>
                            <input
                                id="maxHeight"
                                defaultValue="none"
                                className="col-span-2 h-8"
                            />
                            </div>
                        </div>
                    </div>
                </PopoverContent>
              </Popover>
              <FormLabel>Language</FormLabel>
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
                      Hola
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Dimensions</h4>
                        <p className="text-sm text-muted-foreground">
                        Set the dimensions for the layer.
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                            <label htmlFor="width">Width</label>
                            <input
                                id="width"
                                defaultValue="100%"
                                className="col-span-2 h-8"
                            />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                            <label htmlFor="maxWidth">Max. width</label>
                            <input
                                id="maxWidth"
                                defaultValue="300px"
                                className="col-span-2 h-8"
                            />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                            <label htmlFor="height">Height</label>
                            <input
                                id="height"
                                defaultValue="25px"
                                className="col-span-2 h-8"
                            />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                            <label htmlFor="maxHeight">Max. height</label>
                            <input
                                id="maxHeight"
                                defaultValue="none"
                                className="col-span-2 h-8"
                            />
                            </div>
                        </div>
                    </div>
                </PopoverContent>
              </Popover>

              <FormLabel>Language</FormLabel>
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
                      Hola
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Dimensions</h4>
                        <p className="text-sm text-muted-foreground">
                        Set the dimensions for the layer.
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                            <label htmlFor="width">Width</label>
                            <input
                                id="width"
                                defaultValue="100%"
                                className="col-span-2 h-8"
                            />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                            <label htmlFor="maxWidth">Max. width</label>
                            <input
                                id="maxWidth"
                                defaultValue="300px"
                                className="col-span-2 h-8"
                            />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                            <label htmlFor="height">Height</label>
                            <input
                                id="height"
                                defaultValue="25px"
                                className="col-span-2 h-8"
                            />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                            <label htmlFor="maxHeight">Max. height</label>
                            <input
                                id="maxHeight"
                                defaultValue="none"
                                className="col-span-2 h-8"
                            />
                            </div>
                        </div>
                    </div>
                </PopoverContent>
              </Popover>

              <FormLabel>Language</FormLabel>
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
                      Hola
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Dimensions</h4>
                        <p className="text-sm text-muted-foreground">
                        Set the dimensions for the layer.
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                            <label htmlFor="width">Width</label>
                            <input
                                id="width"
                                defaultValue="100%"
                                className="col-span-2 h-8"
                            />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                            <label htmlFor="maxWidth">Max. width</label>
                            <input
                                id="maxWidth"
                                defaultValue="300px"
                                className="col-span-2 h-8"
                            />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                            <label htmlFor="height">Height</label>
                            <input
                                id="height"
                                defaultValue="25px"
                                className="col-span-2 h-8"
                            />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                            <label htmlFor="maxHeight">Max. height</label>
                            <input
                                id="maxHeight"
                                defaultValue="none"
                                className="col-span-2 h-8"
                            />
                            </div>
                        </div>
                    </div>
                </PopoverContent>
              </Popover>
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
