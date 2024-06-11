"use client";
import React, { useState, useEffect } from "react";
//Hooks
import { useUserTableData } from "@/hooks/useUserData";
// import { useUserData} from "@/hooks/useUserData"
// import { usePrivy } from "@privy-io/react-auth"
//Types:
import {
  BackendValues,
  CatalogosType,
  DashboardDataFormProps,
  TableData,
} from "@/index";

//El coso de actions
import {
  handleSubmitProyectForm,
  handleUpdateProyect,
} from "@/actions/proyectActions";

//Shadcn staff for forms
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";

//UI needed
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CustomField } from "./CustomField";

//Values
import { defaultValuesDashboardForm, randomMarketCap } from "@/utils/index";
import { getProyectNumbers } from "@/services/coinmarketcap/info";

//Schema
export const formSchema = z.object({
  nombre: z
    .string({ required_error: "El campo 'Nombre' no puede estar vacío." })
    .optional(),
  ticket: z
    .string({ required_error: "El campo 'ticket' no puede estar vacío." })
    .optional(),
  id4e: z.string({ required_error: "El campo '4E' no puede estar vacío." }),
  id_decision_proyecto: z.string({
    required_error: "El campo 'Decision' no puede estar vacío.",
  }),
  marketCap: z
    .number()
    .nonnegative("El campo 'Market Cap' debe ser un número.")
    .optional(),
  siAth: z.number().nonnegative("El campo 'Si Ath' debe ser un número."),
  idExchange: z
    .string({ required_error: "El campo 'exchange' no puede estar vacío." })
    .optional(),
  idSector: z
    .string({ required_error: "El campo 'sector' no puede estar vacío." })
    .optional(),
  precioEntrada: z
    .number()
    .nonnegative("El campo 'precio' debe ser un número.")
    .optional(),
  precioActual: z
    .number()
    .nonnegative("El campo 'precio' debe ser un número.")
    .optional(),
});

//The component with its functionalities
const DashboardDataForm = ({
  type,
  data = null,
  catalogos,
  close,
  projectsList,
}: DashboardDataFormProps) => {
  //Catalogos, separados porque vienen en un array
  const data4t = catalogos[0] as CatalogosType[];
  const decision = catalogos[1] as CatalogosType[];
  const exchange = catalogos[2] as CatalogosType[];
  const sector = catalogos[3] as CatalogosType[];

  //Estados para el uso del formulario
  const [count, setCount] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [emptyForm, setEmptyForm] = useState(false);
  const [symbol, setSymbol] = useState("");
  const [editablePrecio, setEditablePrecio] = useState(0);
  const { setUserTableData } = useUserTableData();
  // const {userId} = useUserData();

  //Estados para el manejo de la data
  const [prInfo, setPrInfo] = useState({
    market_cap: 0,
    price: 0,
  });

  // console.log('User id: ', userId)

  //Fetching project info just right after user selects the project
  useEffect(() => {
    console.log(symbol);
    const foo = async () => {
      setPrInfo({
        market_cap: 0,
        price: 0,
      });

      const newPrInfo = await getProyectNumbers(symbol);
      const opa = newPrInfo?.data?.[symbol]?.quote?.USD;
      console.log(opa);
      const market_cap = opa?.market_cap;
      const price = opa?.price;

      setPrInfo({
        market_cap,
        price,
      });

      setEditablePrecio(price);
      
    };
    foo();
  }, [symbol]);

  //Valores por default para los campos del formulario
  const initialValues =
    data && type === "update"
      ? {
          nombre: data?.proyecto,
          ticket: data?.ticker,
          id4e: data?.id4e,
          id_decision_proyecto: data?.id_decision_proyecto,
          siAth: data?.siAth,
          idExchange: data?.idExchange,
          idSector: data?.idSector,
          precioEntrada: data?.precioEntrada,
        }
      : {
        ...defaultValuesDashboardForm,
        precioEntrada: editablePrecio,
      };

  //Defining the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (type === "create") {
      setEmptyForm(false);

      const backendValues: BackendValues = {
        idProyecto: Number(values.nombre),
        id4e: 1,
        id_decision_proyecto: Number(values.id_decision_proyecto),
        marketCap: prInfo.market_cap,
        siAth: values.siAth,
        idExchange: Number(values.idExchange),
        idSector: Number(values.idSector),
        precioActual: prInfo.price,
        precioEntrada: editablePrecio,
      };
      console.log("Backend values", backendValues);

      if (Object.values(backendValues).every((value) => value)) {
        if (
          typeof window !== "undefined" &&
          window.localStorage.getItem("guzma") !== null
        ) {
          const guzma = Number(window.localStorage.getItem("guzma"));
          const newData = await handleSubmitProyectForm(
            backendValues,
            guzma ?? 0,
          );
          if (newData) {
            setCount(count + 1);
            setUserTableData(["Dato añadido" + count]);
            setSubmitted(true);

            form.reset();
            form.reset(defaultValuesDashboardForm);
          }
        } else {
          console.log("Datos null");
          setEmptyForm(true);
        }
      }
    }
    if (type === "update") {
      const backendValuesUpdate = {
        id4e: Number(values.id4e),
        id_decision_proyecto: Number(values.id_decision_proyecto),
        siAth: values.siAth,
        idExchange: Number(values.idExchange),
        idSector: Number(values.idSector),
        precioEntrada: values.precioEntrada,
        id: data?.id_proyecto,
      };

      console.log("Backend values", backendValuesUpdate);

      const newData = await handleUpdateProyect(backendValuesUpdate);

      if (newData) {
        setCount(count + 1);
        setUserTableData(["Cambio de datos" + count]);
        setSubmitted(true);
        form.reset();
        form.reset(defaultValuesDashboardForm);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} action="">
        {emptyForm && (
          <div className="mx-auto w-4/5 mt-6 hidden md:block">
            <p className="bg-red-200 p-2 text-center text-red-700">
              Por favor llena todos los campos
            </p>
          </div>
        )}
        {submitted && (
          <>
            <div className="mx-auto w-4/5 mt-6 hidden md:block">
              <p className="bg-green-200 p-2 text-center text-green-700">
                Proyecto enviado!
              </p>
            </div>
          </>
        )}
        <div className="space-y-6 md:grid grid-flow-row grid-cols-3 gap-6">
          {type === "create" ? (
            <CustomField
              type={type}

              control={form.control}
              name="nombre"
              formLabel="Nombre"
              className="w-full sm:mt-6"
              render={({ field }) => (
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    if (value !== "") {
                      const foo = () => {
                        const b = Number(value);
                        const a = projectsList?.find((pr) => pr.id === b);
                        const symbol = a?.symbol;
                        return symbol as string;
                      };
                      setSymbol(foo());
                    }
                  }}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el nombre" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectsList?.map((proyect) => (
                      <>
                        <SelectItem key={proyect.id} value={String(proyect.id)}>
                          {proyect.proyecto}
                        </SelectItem>
                      </>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          ) : null}

          {/**Ticket */}
          {type === "create" ? (
            <CustomField
              type={type}
              control={form.control}
              name="ticket"
              formLabel="Ticker"
              className="w-full"
              render={({ field }) => (
                <Input
                  {...field}
                  maxLength={5}
                  // value={type === 'create' ? getValues("ticket") : field.value}
                  value={symbol}
                  disabled
                />
              )}
            />
          ) : null}

          {/**4E */}
          {/* <CustomField
                    control={form.control}
                    name="id4e"
                    formLabel="4E"
                    className="w-full sm:mt-6"
                    render={({ field }) => (
                        <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona el 4E" />
                            </SelectTrigger>
                            <SelectContent>
                                {data4t.map((metodo) => (
                                    <SelectItem key={metodo.value} value={String(metodo.value)}>
                                        <Badge
                                            variant="fourE"
                                            color={
                                                metodo.label === "Evaluar"
                                                    ? "yellow"
                                                    : metodo.label === "Encontrar"
                                                    ? "grey"
                                                    : metodo.label === "Estudiar"
                                                    ? "blue"
                                                    : "green"
                                            }
                                        >
                                            {metodo.label}
                                        </Badge>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                /> */}
          {/**Decision */}
          <CustomField
            type={type}
            control={form.control}
            name="id_decision_proyecto"
            formLabel="Decision"
            className={ type === 'update' ? "w-full sm:mt-6" : "w-full"}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
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
                          decision.label === "Watchlist"
                            ? "decisionWatchlist"
                            : decision.label === "Descartar"
                              ? "desicionLeave"
                              : "desicionInvest"
                        }
                      >
                        {decision.label}
                      </Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {/**Market Cap */}
          {type === "create" ? (
            <CustomField
              type={type}
              control={form.control}
              name="marketCap"
              formLabel="Market Cap"
              className="w-full"
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  value={`$ ${
                    prInfo.market_cap != undefined ?
                    prInfo.market_cap.toLocaleString() : 0
                  } USD`}
                  // onChange={(e) => {
                  //     // Elimina los separadores de miles antes de llamar a field.onChange
                  //     const value = parseFloat(e.target.value.replace(/,/g, ""));
                  //     field.onChange(isNaN(value) ? "" : value);
                  // }}
                  disabled
                />
              )}
            />
          ) : null}

          {/**Si Ath */}
          <CustomField
            type={type}
            control={form.control}
            name="siAth"
            formLabel="Si ATH"
            className="w-full"
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                value={field.value}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
              />
            )}
          />
          {/**Exchange */}
          <CustomField
            type={type}
            control={form.control}
            name="idExchange"
            formLabel="Exchange"
            className="w-full"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue  />
                </SelectTrigger>
                <SelectContent>
                  {exchange.map((exchange) => (
                    <SelectItem
                      key={exchange.value}
                      value={String(exchange.value)}
                    >
                      <Badge>{exchange.label}</Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          {/**Sector */}

          <CustomField
            type={type}
            control={form.control}
            name="idSector"
            formLabel="Sector"
            className="w-full"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sector.map((sector) => (
                    <SelectItem key={sector.value} value={String(sector.value)}>
                      <Badge>{sector.label}</Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {/**Precio actual */}
          {
            type === 'create' ? (
              <CustomField
              type={type}
                      control={form.control}
                      name="precioActual"
                      formLabel="Precio actual"
                      className="w-full"
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="text"
                          value={`$ ${
                            prInfo.price != undefined ?
                            prInfo.price.toLocaleString() : 0
                          } USD`}
                          // onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          disabled
                        />
                      )}
                  />
            ) : null
          }


          {/**Precio entrada */}
          {
            type === 'create' ? (
              <CustomField
              type={type}
                      control={form.control}
                      name="precioEntrada"
                      formLabel="Precio entrada"
                      className="w-full"
                      render={({ field }) => (
                        <>
                          <div className="flex items-center gap-1 justify-stretch">
                          <span>$</span>
                            <Input
                              {...field}
                              type="number"
                              value={
                                editablePrecio != undefined ?
                                editablePrecio : 0 
                              }
                              onChange={(e) => {
                                setEditablePrecio(Number(e.target.value))
                                field.value === Number(e.target.value)}}
                          />
                          <span>USD</span>
                          
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          Precio: $ {editablePrecio?.toLocaleString()} USD
                        </p>
                        </>
                        
                          
                      )}
                  />
            ) : (
              <CustomField
              type={type}
                      control={form.control}
                      name="precioEntrada"
                      formLabel="Precio entrada"
                      className="w-full"
                      render={({ field }) => (
                        <>
                          <div className="flex items-center gap-1 justify-stretch">
                          <span>$</span>
                            <Input
                              {...field}
                              type="number"
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(Number(e.target.value))}}
                          />
                          <span>USD</span>
                          
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          Precio: $ {field.value.toLocaleString()} USD
                        </p>
                        </>
                        
                          
                      )}
                  />
            )
          }
          
                
          
        </div>

        {submitted && (
          <>
            <div className="mx-auto w-4/5 mt-6 block md:hidden">
              <p className="bg-green-200 p-2 text-center text-green-700">
                Proyecto enviado!
              </p>
            </div>
          </>
        )}

        {emptyForm && (
          <div className="mx-auto w-4/5 mt-6 block md:hidden">
            <p className="bg-red-200 p-2 text-center text-red-700">
              Por favor llena todos los campos!
            </p>
          </div>
        )}

        {/*Botones*/}

        <div className="flex justify-center mt-8">
          <Button
            type="submit"
            variant="secondary"
            className={`w-4/5 font-bold`}
          >
            {type === "create" ? "Añadir" : "Actualizar"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default DashboardDataForm;
