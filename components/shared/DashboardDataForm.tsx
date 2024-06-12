"use client";
import React, { useState, useEffect } from "react";
//Hooks
import { useUserTableData } from "@/hooks/useUserData";


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
import { useForm } from "react-hook-form";
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
import { defaultValuesDashboardForm } from "@/utils/index";
import { getProyectNumbers } from "@/services/coinmarketcap/info";

//Utils
import { siAthCalculator } from "@/utils/index";


//The component with its functionalities
const DashboardDataForm = ({
  type,
  data = null,
  catalogos,
  projectsList,
}: DashboardDataFormProps) => {
  //Catalogos, separated as they come as an array
  const data4t = catalogos[0] as CatalogosType[];
  const decision = catalogos[1] as CatalogosType[];
  const exchange = catalogos[2] as CatalogosType[];
  const sector = catalogos[3] as CatalogosType[];

  //States for the right use of the form
  const [count, setCount] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [symbol, setSymbol] = useState("");
  const [editablePrecio, setEditablePrecio] = useState(0);
  const { setUserTableData } = useUserTableData();

  //States for setting errors using the hook
  const {formState: { errors }, setError, clearErrors} = useForm();

  //Estados para el manejo de la data de coinmarketcap
  const [prInfo, setPrInfo] = useState({
    market_cap: 0,
    price: 0,
    siAth: 0
  });
  console.log(prInfo.siAth  )


  //Fetching project info just right after user selects the project
  useEffect(() => {
    console.log(symbol);
    const foo = async () => {
      setPrInfo({
        market_cap: 0,
        price: 0,
        siAth: 0
      });

      const newPrInfo = await getProyectNumbers(symbol);
      const opa = newPrInfo?.data?.[symbol]?.quote?.USD;
      console.log(opa);
      const market_cap = opa?.market_cap;
      const price = opa?.price;

      //Esto debería ir en un hook del estado de editablePrecio para 
      //modificar el precio del siAth siempre que se modifique el precio de entrada
      let siAth = 0;
      if(price){
        siAth = siAthCalculator(price, 2390);
      }

      setPrInfo({
        market_cap,
        price,
        siAth
      });

      setEditablePrecio(price);
      
    };
    foo();
  }, [symbol]);

  //Default values for the form
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
  const form = useForm({
    defaultValues: initialValues,
  });


  /*******submit handler********/
  async function onSubmit(values: any) {

    //Form is in create mode

    if (type === "create") {

      //By default this error is false

      //Values/types we need to send to avoid backend errors
      const backendValues: BackendValues = {
        idProyecto: Number(values.nombre),
        id4e: 1,
        id_decision_proyecto: Number(values.id_decision_proyecto),
        marketCap: prInfo.market_cap?? 0,
        siAth: values.siAth,
        idExchange: Number(values.idExchange),
        idSector: Number(values.idSector),
        precioActual: prInfo.price ?? 0,
        precioEntrada: editablePrecio ?? 0,
      };
      console.log("Backend values", backendValues);

      //Checking if all the values are filled
      if ((backendValues.id_decision_proyecto !== 0) && (backendValues.idProyecto !== 0)) {
        //Checking if the user is logged in and bring the guzma value
        if (
          typeof window !== "undefined" &&
          window.localStorage.getItem("guzma") !== null
        ) {
          const guzma = Number(window.localStorage.getItem("guzma"));
          console.log("Guzma", guzma);
          const newData = await handleSubmitProyectForm(
            backendValues,
            guzma ?? 0,
          );
          if (newData) {
            setCount(count + 1);
            setUserTableData(["Dato añadido" + count]);
            setSubmitted(true);

            form.reset(defaultValuesDashboardForm);
          }
        } else {
          console.log("No guzma");
        }
      } else {
        if(backendValues.idProyecto === 0){
          setError('nombre', {
            type: "manual",
            message: `Nombre es obligatorio`
          });
        }
        if(backendValues.id_decision_proyecto === 0){
          setError('id_decision_proyecto', {
            type: "manual",
            message: `Decision es obligatorio`
          });
        }
      }
    }
    //Form is in update mode
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
        form.reset(defaultValuesDashboardForm);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} action="">
        {(errors.nombre || errors.id_decision_proyecto) && (
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
              name="nombre"
              formLabel="Nombre"
              className="w-full sm:mt-6"
              render={({ field }) => (
                <>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      clearErrors('nombre');
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
                    <SelectTrigger
                      className={errors.nombre ? 'border-red-500 text-red-500' : ''}
                    >
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
                  {errors.nombre && <p className="text-red-500 text-sm mt-2">Nombre es obligatorio</p>}
                  {symbol && <p className="text-sm text-gray-500 mt-2">Ticker: {symbol}</p>}
                </>
              )}
            />
          ) : null}

          {/**Ticket */}
          {/* {type === "create" ? (
            <CustomField
              type={type}
              name="ticket"
              formLabel="Ticker"
              className="w-full"
              render={({ field }) => (
                <Input
                  {...field}
                  maxLength={5}
                  value={symbol}
                  disabled
                />
              )}
            />
          ) : null} */}

            {/* /**4E */}
            {/* <CustomField
            
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
                <SelectItem
                  key={metodo.value}
                  value={String(metodo.value)}
                >
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
            />  */}

            {/**Decision */}
          <CustomField
            type={type}    
            name="id_decision_proyecto"
            formLabel="Decision"
            className={ type === 'update' ? "w-full sm:mt-6" : "w-full mt-0"}
            render={({ field }) => (
              <>
                <Select 
                  onValueChange={(value) => {
                    field.onChange(value);
                    clearErrors('id_decision_proyecto');
                  }}
                  defaultValue={field.value}>
                  <SelectTrigger
                    className={errors.id_decision_proyecto ? 'border-red-500 text-red-500' : ''}
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
                {errors.id_decision_proyecto && <p className="text-red-500 text-sm mt-2">Decision es obligatorio</p>}
              </>
            )}
          />
          <div>

          </div>
          {/**Market Cap */}
          {type === "create" ? (
            <CustomField
              type={type}
              
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
                  disabled
                />
              )}
            />
          ) : null}

          {/**Si Ath */}
          <CustomField
            type={type}
            name="siAth"
            formLabel="Si ATH"
            className="w-full"
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                value={`${
                  (prInfo.siAth === undefined) ?
                    0 : prInfo.siAth.toLocaleString() 
                } X`}
                disabled
              />
            )}
          />
          {/**Precio actual */}
          {
            type === 'create' ? (
              <CustomField
              type={type}
                      
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

          {/**Exchange */}
          <CustomField
            type={type}
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

        {(errors.nombre || errors.id_decision_proyecto) && (
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
