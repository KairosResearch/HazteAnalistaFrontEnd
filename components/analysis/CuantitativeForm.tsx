
import React from 'react'
import { Input } from "@/components/ui/input";
import { CustomField } from "@/components/shared/CustomField";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

  import { AnalisysCatalogs } from '@/index';
  import { ValueObject } from '@/index';


interface CualitativeFieldsProps {
    mode: "edit" | "add";
    data: AnalisysCatalogs;
    setCuantitativeValues: (value: any) => void;
}

const CualitativeFields = ({mode, data, setCuantitativeValues}: CualitativeFieldsProps) => {
    
    
    const fieldsMapping = [
        { name: "tokenomics", formLabel: "Tokenomics" },
        { name: "onChain", formLabel: "Metricas On chain" },
        { name: "finance", formLabel: "Finanzas" },
        { name: "exchange", formLabel: "Exchanges" },
        
      ];
  return (


    <>
    {
        data.map((item, index: number) => (
            <CustomField
            key={index}
                type={mode}
                name={fieldsMapping[index] ? fieldsMapping[index].name : "defaultName"}
                formLabel={fieldsMapping[index] ? fieldsMapping[index].formLabel : "defaultName"}
                className=" w-10/12 text-left"
                render={({ field }) => (
                    <Select onValueChange={(value) => {
                        field.onChange(value);

                        // const a = item.find((item: any) => item.id === value)?.value  as number

                        // console.log(a)
                        setCuantitativeValues((prevValues: ValueObject[]) => {
                            const newValue = item.find((item) => String(item.id) === value)?.value as number;
                            const fieldToUpdate = fieldsMapping[index] ? fieldsMapping[index].name : "defaultName";
                            
                            // Buscar si ya existe un objeto con el mismo 'field'
                            const existingIndex = prevValues.findIndex(obj => obj.field === fieldToUpdate);
                            
                            if (existingIndex !== -1) {
                              // Si existe, crea una copia del arreglo y actualiza solo el valor de ese objeto
                              const updatedValues = [...prevValues];
                              updatedValues[existingIndex] = { ...updatedValues[existingIndex], value: newValue };
                              return updatedValues;
                            } else {
                              // Si no existe, añade un nuevo objeto al arreglo
                              return [...prevValues, { field: fieldToUpdate, value: newValue }];
                            }
                          });
                      } }
                      defaultValue={field.value}>
                    <SelectTrigger >
                         <SelectValue placeholder={fieldsMapping[index] ? fieldsMapping[index].formLabel : field.value}/>
                        {/* <SelectValue placeholder={field.value} />  */}
                        
                    </SelectTrigger>
                    <SelectContent>
                        {
                            item.map((item: any) => (
                                <SelectItem
                                    key={item.id}
                                    value={String(item.id)}
                                    className='hover:bg-primary/20'

                                >
                                    {item.item}
                                </SelectItem>
                            ))
                        }
                    </SelectContent>
                    </Select>
                )}
            />
        ))
    }
        
       
    </>
  )
}

export default CualitativeFields