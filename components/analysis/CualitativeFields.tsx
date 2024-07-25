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
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { AnalisysCatalogs } from "@/index";
import { ValueObject } from "@/index";

interface CualitativeFieldsProps {
  mode: "edit" | "add";
  data: AnalisysCatalogs;
  setCualitativeValues: (value: any) => void;
}

const CualitativeFields = ({
  mode,
  data,
  setCualitativeValues,
}: CualitativeFieldsProps) => {
  const fieldsMapping = [
    { name: "alianzas", formLabel: "Alianzas" },
    { name: "auditorias", formLabel: "Auditorias" },
    { name: "casosUso", formLabel: "Casos de uso" },

    { name: "comunidad", formLabel: "Comunidad" },
    { name: "financeCual", formLabel: "Financiamientos" },
    { name: "equipo", formLabel: "Equipo" },
    { name: "roadmap", formLabel: "Roadmap" },
    { name: "whitepaper", formLabel: "Whitepaper" },
  ];

  return (
    <>
      {data.map((item, index: number) => {
        return (
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
            className=" w-full text-left"
            render={({ field }) => (
              
                <div className="w-full flex flex-col gap-3 ml-6">
                  {item.map((item) => (
                    <div className="flex items-center gap-3">

<Checkbox
                      key={item.id}
                      checked={field.value?.includes(item.id)}
                      
                      onCheckedChange={(checked) => {
                        const iDunno = (checked: boolean) => {
                          if (checked) {
                            setCualitativeValues((prev:number) => prev + item.value);
                            field.onChange([...field.value, item.id]);
                          } else {
                            setCualitativeValues((prev: number) => prev - item.value);
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
        );
      })}
    </>
  );
};

export default CualitativeFields;
