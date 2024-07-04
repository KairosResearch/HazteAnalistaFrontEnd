import React from "react";
import { CustomField } from "./CustomField";

import ComboboxName from "./ComboboxName";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../../ui/select";
import FormNumbers from './FormNumbers';
import { useTabsState } from "@/hooks/useTabs";

interface LeftSideForm {
  type: "create" | "update" | null;
  symbol: string;
  errors: any;
  setSymbol: any;
  projectsList:
    | {
        id: number;
        proyecto: string;
        ticker: string;
        symbol: string;
      }[];
  clearErrors: any;
  prInfo: any;
  rendimiento: any;
}

const LeftSideForm = ({
  type,
  symbol,
  errors,
  setSymbol,
  projectsList,
  clearErrors,
  prInfo,
  rendimiento,
}: LeftSideForm) => {
  const { isReadyNextTab, setIsReadyNextTab } = useTabsState();
  const [open, setOpen] = React.useState(false)


  return (
    <div className="">
      <div className="nombreblock">
        <CustomField
          type={type}
          name="nombre"
          formLabel="Nombre"
          className="w-full sm:mt-6"
          render={({ field }) => (
            <>
              
              <ComboboxName 
                projects={projectsList}
              />
     
              <p className="text-red-500 text-sm mt-2">
                {errors.nombre && <>{errors.nombre.message || ""}</>}
              </p>
            </>
          )}
        />
      </div>
      {symbol && (
        <p className=" token text-sm text-gray-500 mt-2">Token: $ {symbol}</p>
      )}

      <div className="flex flex-col gap-4 mt-6 justify-center pl-2">
        {/**Market Cap */}
        <div className="capblock">
          <FormNumbers
            values={`$ ${
              prInfo.market_cap != undefined
                ? prInfo.market_cap.toLocaleString()
                : 0
            } USD`}
            title="Market Cap"
            image="marketCap"
          />
        </div>

        {/**Si Ath */}
        <div className="calcblock">
          <FormNumbers
            values={`${rendimiento} %`}
            title="Rendimiento"
            image="siAth"
          />

          {/**Precio Actual */}
          <FormNumbers
            values={`$ ${
              prInfo.price != undefined ? prInfo.price.toLocaleString() : 0
            } USD`}
            title="Precio Actual"
            image="precioActual"
          />
        </div>
      </div>
    </div>
  );
};

export default LeftSideForm;
