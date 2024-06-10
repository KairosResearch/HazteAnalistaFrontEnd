import React from "react";
import { Control } from "react-hook-form";
 import { z } from "zod";

import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "../ui/form";

import { formSchema } from "./DashboardDataForm";


type CustomFieldProps = {
  control: Control<z.infer<typeof formSchema>> | undefined;
  render: (props: { field: any }) => React.ReactNode;
  name: keyof z.infer<typeof formSchema>;
  formLabel?: string;
  className?: string;
};

export const CustomField = ({
  control,
  render,
  name,
  formLabel,
  className,
}: CustomFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {formLabel && 
          
            <FormLabel>
              {(formLabel === 'Sector' || formLabel === 'Exchange') ? `${formLabel} (opcional)` : formLabel }
            </FormLabel>
          
          }

           
          
          <FormControl>{render({ field })}</FormControl>  
          <FormMessage>
            {
              (name === 'idSector' || name === 'idExchange')? (
              <p className="text-sm text-gray-500 mt-2">
                Puedes agregar esta información más adelante desde la sección de edición del proyecto.
              </p>
              ) : null
            }

          </FormMessage>
        </FormItem>
      )}
    />
  );
};