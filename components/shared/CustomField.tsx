import React, { Ref } from "react";

import { iconsForm } from "@/utils/index";

import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "../ui/form";
import Image from "next/image";

// import { formSchema } from "./DashboardDataForm";


type CustomFieldProps = {

  render: (props: { field: any }) => React.ReactNode;
  name: string;
  formLabel?: string;
  className?: string;
  type: 'create' | 'update' | null;
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
          {formLabel && 
          
            <FormLabel>
              <div className="flex gap-2 items-center mb-6 md:mb-0">

                {
                  a &&
                  <Image
                    src={a?.icon }
                    alt={a?.alt}
                    width={15}
                    height={15}
                  />
                }
                  

                

                <p>
                {(formLabel === 'Sector' || formLabel === 'Exchange') && type === 'create' ? `${formLabel} (opcional)` : formLabel }
                </p>
              </div>
              
            </FormLabel>
          
          }
          
           
          
          <FormControl>{render({ field })}</FormControl>  
          
            <FormMessage>
              {
                (name === 'idSector' || name === 'idExchange') && (type === "create") ? (
                <p className="text-sm text-gray-500 mt-2">
                  **Puedes editar esta información más tarde
                </p>
                ) : null
              }

            </FormMessage>
        </FormItem>
      )}
    />
  );
};