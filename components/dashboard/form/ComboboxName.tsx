"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ComboboxDemoProps {
    projects: | {
        id: number;
        proyecto: string;
        ticker: string;
        symbol: string;
      }[]
}

const  ComboboxDemo= ({projects}: ComboboxDemoProps) => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  console.log

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? projects.find((project) => String(project.proyecto) === value)?.proyecto
            : "Select project..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-full">
        <Command>
          <CommandInput placeholder="Search project..." />
          <CommandList>
            <CommandEmpty>No project found.</CommandEmpty>
            <CommandGroup>
              {projects.map((project) => (
                <CommandItem
                    className="hover:cursor-pointer"
                  key={project.id}
                  value={String(project.proyecto)}
                  onSelect={(curentValue) => {
                    setValue(curentValue === value ? "" : curentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === project.proyecto ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {project.proyecto}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
export default ComboboxDemo