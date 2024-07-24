import React from "react";
import { Input } from "@/components/ui/input";
import { CustomField } from "@/components/shared/CustomField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
            className=" w-10/12 text-left"
            render={({ field }) => (
              <Select
                defaultValue={String(field.value)}
                onValueChange={(value) => {
                  field.onChange(value);
                  // const a = item.find((item: any) => item.id === value)?.value  as number
                  // console.log(a)
                  setCualitativeValues((prevValues: ValueObject[]) => {
                    const newValue = item.find(
                      (item) => String(item.id) === value,
                    )?.value as number;
                    const fieldToUpdate = fieldsMapping[index]
                      ? fieldsMapping[index].name
                      : "defaultName";

                    // Buscar si ya existe un objeto con el mismo 'field'
                    const existingIndex = prevValues.findIndex(
                      (obj) => obj.field === fieldToUpdate,
                    );

                    if (existingIndex !== -1) {
                      // Si existe, crea una copia del arreglo y actualiza solo el valor de ese objeto
                      const updatedValues = [...prevValues];
                      updatedValues[existingIndex] = {
                        ...updatedValues[existingIndex],
                        value: newValue,
                      };
                      return updatedValues;
                    } else {
                      // Si no existe, añade un nuevo objeto al arreglo
                      return [
                        ...prevValues,
                        { field: fieldToUpdate, value: newValue },
                      ];
                    }
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      fieldsMapping[index]
                        ? fieldsMapping[index].formLabel
                        : field.value
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {item.map((item) => (
                    <SelectItem
                      className="hover:bg-primary/20"
                      key={item.id}
                      value={String(item.id)}
                    >
                      {item.item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        );
      })}
    </>
  );
};

export default CualitativeFields;
