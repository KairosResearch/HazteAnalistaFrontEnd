"use client";
//Imports for the component.
//React
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
//values and utilities
import { cn } from "@/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
//Hooks
import { useTabsState } from "@/hooks/useTabs";
import { useComparativeTokens } from "@/hooks/useComparative";

interface ComboboxDemoProps {
  projects: {
    id: number;
    proyecto: string;
    ticker: string;
    symbol: string;
  }[];
  field: any;
  setSymbol: any;
  clearErrors: any;
  comboSide: "left" | "right" | null;
  value: string;
  setValue: (value: string) => void;
}

const ComboboxDemo = ({
  projects,
  field,
  clearErrors,
  setSymbol,
  comboSide,
  value,
  setValue,
}: ComboboxDemoProps) => {
  const [open, setOpen] = React.useState(false);

  const { isReadyNextTab, setIsReadyNextTab } = useTabsState();
  const { setToken1, setToken2 } = useComparativeTokens();

  if (comboSide === "left") {
    console.log("valueA", value);
  } else if (comboSide === "right") {
    console.log("valueB", value);
  } else {
    console.log("comboSide is null");
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between m-0"
        >
          {value
            ? projects.find((project) => String(project.proyecto) === value)
                ?.proyecto
            : comboSide === null
              ? "Elige un proyecto"
              : comboSide === "left"
                ? "Selecciona A"
                : "Selecciona B"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-full">
        <Command>
          <CommandInput placeholder="" />
          <CommandList>
            <CommandEmpty>No se encontró proyecto.</CommandEmpty>
            <CommandGroup>
              {projects.map((project) => (
                <CommandItem
                  className="hover:cursor-pointer"
                  key={project.id}
                  value={String(project.proyecto)}
                  onSelect={(curentValue) => {
                    const projectSelected = projects.find(
                      (project) => project.proyecto === curentValue,
                    );
                    field.onChange(projectSelected?.id);
                    setValue(curentValue === value ? "" : curentValue);
                    setOpen(false);
                    clearErrors("nombre");

                    const foo = () => {
                      const symbol = projectSelected?.symbol;
                      return symbol as string;
                    };
                    const ticker = foo();
                    setSymbol(ticker);
                    if (comboSide === "left") {
                      console.log("Setting token1 on izquierda:", ticker);
                      setToken1(ticker);
                    } else if (comboSide === "right") {
                      console.log("Setting token2 on derecha:", ticker);
                      setToken2(ticker);
                    } else null;

                    setIsReadyNextTab(true);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === project.proyecto ? "opacity-100" : "opacity-0",
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
  );
};
export default ComboboxDemo;
