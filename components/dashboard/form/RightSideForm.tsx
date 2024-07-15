import React from "react";
import { Badge } from "@/components/ui/badge";
import { CustomField } from "./CustomField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import EditablePrecio from "./EditablePrecio";

import { Checkbox } from "@/components/ui/checkbox";

//Types:
interface RightSideForm {
  type: "create" | "update" | null;
  editablePrecio: string;
  setEditablePrecio: any;
  errors: any;
  clearErrors: any;
  decision: {
    value: number;
    label: string;
  }[];
  exchange: {
    value: number;
    label: string;
  }[];
  sector: {
    value: number;
    label: string;
  }[];
  data4e: {
    value: number;
    label: string;
  }[];
}

const RightSideForm = ({
  type,
  editablePrecio,
  setEditablePrecio,
  errors,
  clearErrors,
  decision,
  exchange,
  sector,
  data4e,
}: RightSideForm) => {
  return (
    <>
      <div className="hidden md:block">
        <EditablePrecio
          type={type}
          editablePrecio={editablePrecio}
          setEditablePrecio={setEditablePrecio}
        />
      </div>

      <div className="foureblock">
        <CustomField
          type={type}
          name="id4e"
          formLabel="4E (Opcional)"
          className={`  w-full ${type === "update" ? "sm:mt-6 " : "mt-0 mb-2 md:mb-0"}`}
          render={({ field }) => (
            <>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  clearErrors("id_decision_proyecto");
                }}
                defaultValue={field.value}
              >
                <SelectTrigger className="">
                  <SelectValue placeholder="Elige el 4e sobre el proyecto" />
                </SelectTrigger>
                <SelectContent>
                  {data4e.map((fourE) => (
                    <SelectItem key={fourE.value} value={String(fourE.value)}>
                      <Badge
                        variant="fourE"
                        color={
                          fourE.value === 2
                            ? "yellow"
                            : fourE.value === 3
                              ? "orange"
                              : fourE.value === 4
                                ? "blue"
                                : fourE.value === 5
                                  ? "green"
                                  : "grey"
                        }
                      >{fourE.label}</Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.id_decision_proyecto && (
                <p className="text-red-500 text-sm mt-2">
                  Decision es obligatorio
                </p>
              )}
            </>
          )}
        />
      </div>

      {/**Decision */}
      <div className="decisionblock">
        <CustomField
          type={type}
          name="id_decision_proyecto"
          formLabel="Decision"
          className={`  w-full ${type === "update" ? "" : " mb-2 md:mb-0"}`}
          render={({ field }) => (
            <>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  clearErrors("id_decision_proyecto");
                }}
                defaultValue={field.value}
              >
                <SelectTrigger
                  className={`${errors.id_decision_proyecto ? "border-red-500 text-red-500" : ""}`}
                >
                  <SelectValue placeholder="Decision sobre el proyecto" />
                </SelectTrigger>
                <SelectContent>
                  {decision.map((decision) => (
                    <SelectItem
                      key={decision.value}
                      value={String(decision.value)}
                    >
                      <Badge
                        variant={
                          decision.value === 2
                            ? "decisionWatchlist"
                            : decision.value === 3
                              ? "desicionLeave"
                              : "Ninguno"
                        }
                      >
                        {decision.label}
                      </Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.id_decision_proyecto && (
                <p className="text-red-500 text-sm mt-2">
                  Decision es obligatorio
                </p>
              )}
            </>
          )}
        />
      </div>
      {/**Exchange */}

      <div className="exchangeblock">
        <CustomField
          type={type}
          name="idExchange"
          formLabel="Exchange"
          className="  w-full"
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {exchange.map((exchange) => (
                  <SelectItem
                    key={exchange.value}
                    value={String(exchange.value)}
                  >
                    <Badge
                    variant={
                      exchange.value === 2
                        ? "binance"
                        : exchange.value === 3
                          ? "coinbase"
                        : exchange.value === 4
                      ?"kraken"
                      : "Ninguno"
                    }
                  >
                    {exchange.label
                    }
                  </Badge>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>


      {/**Sector */}
      <div className="sectorblock">
        <CustomField
          type={type}
          name="sectores"
          formLabel="Sectores"
          className="  w-full"
          render={({ field }) => (
            <div className="grid  grid-cols-3 lg:grid-cols-5 gap-2">
              {sector.map((sector) => (
                  <div key={sector.value} className="flex items-center">
                    <Checkbox
                      className="mr-3"
                            checked={field.value?.includes(sector.value)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, sector.value])
                                : field.onChange(
                                    field.value?.filter(
                                      (value: any) => value !== sector.value
                                    )
                                  )
                            }}
                          />
                    <Badge
                      variant={
                        sector.label as any
                      }
                    >{sector.label}</Badge>
                  </div>
                    
                  
                ))}
            
            </div>
            
                
             
          )}
        />
      </div>
    </>
  );
};

export default RightSideForm;
