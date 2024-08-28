//Imports for the component.
//React
import React from "react";
//components
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CustomField } from "../../shared/CustomField";
import EditablePrecio from "./EditablePrecio";
import { Checkbox } from "@/components/ui/checkbox";
//Ui needed
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
//Values and utilities
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["checked"];

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
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
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
                      >
                        {fourE.label}
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

      {/**Decision */}
      <div className="decisionblock">
        <CustomField
          type={type}
          name="id_decision_proyecto"
          formLabel="Decisión"
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
                  <SelectValue placeholder="Decisión sobre el proyecto" />
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
                  Decisión es obligatorio
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
                              ? "kraken"
                              : "Ninguno"
                      }
                    >
                      {exchange.label}
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
            <div className="">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between m-0"
                  >
                    {field.value?.length
                      ? sector
                          .filter((sector) =>
                            field.value.includes(sector.value),
                          )
                          .map((sector) => sector.label)
                          .join(", ")
                      : "Selecciona los sectores"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Elige el sector</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {sector.map((sector) => (
                    <DropdownMenuCheckboxItem
                      key={sector.value}
                      checked={field.value?.includes(sector.value)}
                      onCheckedChange={(checked) => {
                        return checked
                          ? field.onChange([...field.value, sector.value])
                          : field.onChange(
                              field.value?.filter(
                                (value: any) => value !== sector.value,
                              ),
                            );
                      }}
                    >
                      <Badge variant={sector.label as any}>
                        {sector.label}
                      </Badge>
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        />
      </div>
    </>
  );
};

export default RightSideForm;
