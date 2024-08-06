//Imports for the component.
//React
import React from "react";
//Next 
import Image from "next/image";
//Values and utilities
import { iconsForm } from "@/utils/index";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";

//import { formSchema } from "./DashboardDataForm";

type CustomFieldProps = {
  render: (props: { field: any }) => React.ReactNode;
  name: string;
  formLabel?: string;
  className?: string;
  type: string | null;
};

export const CustomField = ({
  render,
  name,
  formLabel,
  className,
  type,
}: CustomFieldProps) => {
  const a = iconsForm.find((icon) => icon.name === name);
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {formLabel && (
            <FormLabel>
              <div className="flex gap-2 items-center  md:mb-0">
                {a && (
                  <Image src={a?.icon} alt={a?.alt} width={15} height={15} />
                )}

                <h3 className="p-0 m-0">
                  {(formLabel === "Sector" || formLabel === "Exchange") &&
                  type === "create"
                    ? `${formLabel} (opcional)`
                    : formLabel}
                </h3>
              </div>
              <p className="text-xs text-primary-foreground/90 m-0.5">
                {name === "precioEntrada" && type === "create" ? (
                  <span>¿A qué precio adquiriste el token?</span>
                ) : name === "id4e" ? (
                  <span>Etapa de análisis en la que te encuentres</span>
                ) : name === "idSector" ? (
                  <span>Sector al que pertenece el proyecto</span>
                ) : null}
              </p>
            </FormLabel>
          )}

          <FormControl>{render({ field })}</FormControl>

          <FormMessage>
            {(name === "idSector" || name === "idExchange") &&
            type === "create" ? (
              <p className="text-sm text-gray-500 mt-2">
                **Puedes editar esta información más tarde
              </p>
            ) : null}
          </FormMessage>
        </FormItem>
      )}
    />
  );
};
