import React from "react";
import { Input } from "@/components/ui/input";
import { CustomField } from "@/components/shared/CustomField";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";


import { AnalisysCatalogs } from "@/index";
import { ValueObject } from "@/index";

interface CualitativeFieldsProps {
  mode: "edit" | "add";
  data: AnalisysCatalogs;
  setCuantitativeValues: (value: any) => void;
}

const CualitativeFields = ({
  mode,
  data,
  setCuantitativeValues,
}: CualitativeFieldsProps) => {
  const fieldsMapping = [
    { name: "tokenomics", formLabel: "Tokenomics" },
    { name: "onChain", formLabel: "Metricas On chain" },
    { name: "finance", formLabel: "Finanzas" },
    { name: "exchange", formLabel: "Exchanges" },
  ];
  return (
    <>
      {data.map((item, index: number) => (
        <CustomField
          key={index}
          type={mode}
          name={
            fieldsMapping[index] ? fieldsMapping[index].name : "defaultName"
          }
          formLabel={
            fieldsMapping[index]
              ? fieldsMapping[index].formLabel
              : "defaultName"
          }
          className=" w-10/12 text-left"
          render={({ field }) => (
            <div className="w-full flex flex-col gap-3 ml-6">
            {item.map((item) => (
              <div  key={item.id} className="flex items-center gap-3">

<Checkbox
               
                checked={field.value?.includes(item.id)}
                
                onCheckedChange={(checked) => {
                  const iDunno = (checked: boolean) => {
                    if (checked) {
                      setCuantitativeValues((prev:number) => prev + item.value);
                      field.onChange([...field.value, item.id]);
                    } else {
                      setCuantitativeValues((prev: number) => prev - item.value);
                      field.onChange(field.value?.filter((value: any) => value !== item.id));
                    }
                  }
                  

                  return iDunno(checked as boolean);
                }}
              />
                <span className="text-grey-light/90"> {item.item}</span>
                  
              </div>
              
              
            ))}
          </div>
        
      )}
        />
      ))}
    </>
  );
};

export default CualitativeFields;
