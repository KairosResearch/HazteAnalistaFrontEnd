//Imports for the component.
//React
import React from "react";
//Components
import { CustomField } from "../../shared/CustomField";
import FormNumbers from "./FormNumbers";
import ComboboxName from "./ComboboxName";
//Values and utilities
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../../ui/select";


interface LeftSideForm {
  type: "create" | "update" | null;
  symbol: string;
  errors: any;
  setSymbol: any;
  projectsList: {
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
  const formattedRendimiento = rendimiento.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return (
    <div className="">
      <div className="nombreblock">
      <h2>Elige tu próximo proyecto para investigar</h2>
        <CustomField
          type={type}
          name="nombre"
          formLabel="Nombre"
          className="w-full "
          render={({ field }) => (
            <>
              <ComboboxName
              comboSide={null}
                projects={projectsList}
                field={field}
                setSymbol={setSymbol}
                clearErrors={clearErrors}
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

      <div className="flex flex-col gap-4 md:gap-7 my-6 justify-center pl-2">
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
        <div className="calcblock flex flex-col gap-4 md:gap-7 ">
          
          <FormNumbers
            values={`${formattedRendimiento} %`}
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
