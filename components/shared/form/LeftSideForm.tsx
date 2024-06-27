import React from 'react'
import { CustomField } from '../CustomField';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../../ui/select";
import FormNumbers from '../FormNumbers';
import { useTabsState } from '@/hooks/useTabs';

interface LeftSideForm{
    type: 'create' | 'update' | null,
    symbol: string,
    errors: any,
    setSymbol: any,
    projectsList: {
        id: number;
        proyecto: string;
        ticker: string;
        symbol: string;
    }[] | null,
    clearErrors: any,
    prInfo: any,
    rendimiento: any
}


const LeftSideForm = (
    {
        type,
        symbol,
        errors,
        setSymbol,
        projectsList,
        clearErrors,
        prInfo,
        rendimiento
    }: LeftSideForm
) => {
  const {isReadyNextTab, setIsReadyNextTab} = useTabsState();

  return (
    <div className="">
              <div id='nombreblock'>
              <CustomField
                type={type}
                name="nombre"
                formLabel="Nombre"
                className="w-full sm:mt-6"
                render={({ field }) => (
                  <>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        clearErrors("nombre");
                        if (value !== "") {
                          const foo = () => {
                            const b = Number(value);
                            const a = projectsList?.find((pr) => pr.id === b);
                            const symbol = a?.symbol;
                            return symbol as string;
                          };
                          setSymbol(foo());
                        }
                        setIsReadyNextTab(true);
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        className={
                          errors.nombre ? "border-red-500 text-red-500" : ""
                        }
                      >
                        <SelectValue placeholder="Selecciona el nombre" />
                      </SelectTrigger>
                      <SelectContent>
                        {projectsList?.map((proyect) => (
                          <>
                            <SelectItem
                              className="hover:text-black"
                              key={proyect.id}
                              value={String(proyect.id)}
                            >
                              {proyect.proyecto}
                            </SelectItem>
                          </>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-red-500 text-sm mt-2">
                      {errors.nombre && <>{errors.nombre.message || ""}</>}
                    </p>
                   
                  </>
                )}
              />
              </div>
              {symbol && (
                      <p id="token" className="text-sm text-gray-500 mt-2">
                        Token: $ {symbol}
                      </p>
              )}
              

              <div className="flex flex-col gap-4 mt-6 justify-center pl-2">
                {/**Market Cap */}
                <div id="capblock">
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
                <div id="calcblock">
                  <FormNumbers
                    values={`${rendimiento} %`}
                    title="Rendimiento"
                    image="siAth"
                  />

                  {/**Precio Actual */}
                  <FormNumbers
                    values={`$ ${
                      prInfo.price != undefined
                        ? prInfo.price.toLocaleString()
                        : 0
                    } USD`}
                    title="Precio Actual"
                    image="precioActual"
                  />
                </div>

               
              </div>
            </div>
  )
}

export default LeftSideForm