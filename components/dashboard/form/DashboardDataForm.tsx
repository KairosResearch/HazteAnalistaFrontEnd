"use client";

//Imports for the component
//React
import React, { useState, useEffect } from "react";
//Hooks
import { useUserTableData } from "@/hooks/useUserData";
import { useDialogItem, useDialogInstructions } from "@/hooks/useDialogs";
import { useTabsState } from "@/hooks/useTabs";
import { useProjects } from "@/hooks/useProjects";

//Types:
import { BackendValues, CatalogosType, DashboardDataFormProps } from "@/index";

//Server actions for both adding and updating
import {
  handleSubmitProyectForm,
  handleUpdateProyect,
} from "@/actions/proyectActions";

//Shadcn staff for forms
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

//UI needed
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

//Values and utils
import {
  debounce,
  defaultValuesDashboardForm,
  rendimientoCalculator,
} from "@/utils/index";
//service for fetching data from coinmarketcap about prices
import { getProyectNumbers } from "@/services/coinmarketcap/info";

//reusable components used in the form
import LeftSideForm from "./LeftSideForm";
import RightSideForm from "./RightSideForm";
import EditablePrecio from "./EditablePrecio";

//------The component with its functionalities------//
const DashboardDataForm = ({
  type,
  data = null,
  catalogos,
  projectsList,
}: DashboardDataFormProps) => {
  //Catalogos, separated as they come as an array
  const data4e = catalogos[0] as CatalogosType[];
  const decision = catalogos[1] as CatalogosType[];
  const exchange = catalogos[2] as CatalogosType[];
  const sector = catalogos[3] as CatalogosType[];
  const [guzma, setGuzma] = useState<number | null>(null);

  

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage.getItem("guzma") !== null) {
      setGuzma(Number(window.localStorage.getItem("guzma")));
    }
  }, []);
  const {  mutate } = useProjects(guzma ?? 0);

  //States for the right use of the form
  //Counter so that everytime the submit is correct, it changes the value of
  //global state that manipulates the fetching data on the table
  const [count, setCount] = useState(1);

  const [submitted, setSubmitted] = useState(false);

  //States of the values added automatically with apis
  const [symbol, setSymbol] = useState("");
  const [editablePrecio, setEditablePrecio] = useState("");
  const [rendimiento, setRendimiento] = useState(0);

  //States from hooks
  //Global state that manipulates the fetching data on the table
  const { setUserTableData } = useUserTableData();
  //Global state that manipulates the change-tab-button (mobile view)
  const { isReadyNextTab, setIsReadyNextTab } = useTabsState();
  //manipulates the dialog open-state
  const { setIsOpen } = useDialogItem();
  //If is user's first time, will show onboarding methods
  //And if its mobile, it needs to read the tab
  //That are changed in the onboarding process
  const { isOpenInstr, defaultTab } = useDialogInstructions();

  //States for setting/cleaning errors using the hook useForm
  const {
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  //Estado para el manejo de la data de coinmarketcap
  const [prInfo, setPrInfo] = useState({
    market_cap: 0,
    price: 0,
  });

  //Fetching project info just right after user selects the project
  useEffect(() => {
    //set everything to 0
    const foo = async () => {
      setPrInfo({
        market_cap: 0,
        price: 0,
      });

      //fetching the data from the api
      const newPrInfo = await getProyectNumbers(symbol);
      //setting the values as they come from the api
      const opa = newPrInfo?.data?.[symbol]?.quote?.USD;
      const market_cap = opa?.market_cap;
      const price = opa?.price;
      price && setEditablePrecio(price.toString());

      setPrInfo({
        market_cap,
        price,
      });
      //editable price is the 'Precio entrada' field
      //And its default value is the price from the api
    };
    foo();
  }, [symbol]);

  //Difning the 'rendimiento' when editablePrice changes
  //Not inmediately, but after a debounce foo of 1 sec
  useEffect(() => {
    const debouncedFunction = debounce(() => {
      const valorDecimal = parseFloat(editablePrecio.replace(",", "."));
      const rendimiento = rendimientoCalculator(valorDecimal, prInfo.price);
      setRendimiento(rendimiento);
    }, 900);

    if (editablePrecio) {
      debouncedFunction();
    }

    return () => debouncedFunction.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editablePrecio]);

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
          sectores: data?.sectores,
          precioEntrada: data?.precioEntrada.toString(),
        }
      : {
          ...defaultValuesDashboardForm,
        };

  //Defining the form
  const form = useForm({
    defaultValues: initialValues,
  });

  /*******submit handler********/
  async function onSubmit(values: any) {
    //Form is in create mode

    if (type === "create") {
      //Values/types we need to send to avoid backend errors
      const backendValues: BackendValues = {
        idProyecto: Number(values.nombre),
        id4e: values.id4e,
        id_decision_proyecto: Number(values.id_decision_proyecto) ?? 1,
        marketCap: prInfo.market_cap ?? 0,
        idExchange: Number(values.idExchange),
        idSector: values.sectores.length === 0 ? [1] : values.sectores,
        precioActual: prInfo.price ?? 0,
        precioEntrada: editablePrecio ?? "0",
      };

      console.log(backendValues);

      // //Checking if all the needed values are filled
      if (
        backendValues.id_decision_proyecto !== 0 &&
        backendValues.idProyecto !== 0
      ) {
        //Checking if the user is logged in and bring the guzma value
        if (
          typeof window !== "undefined" &&
          window.localStorage.getItem("guzma") !== null
        ) {
          const guzma = Number(window.localStorage.getItem("guzma"));
          //If guzma is not 0, we send the data to the backend
          const newData = await handleSubmitProyectForm(
            backendValues,
            guzma ?? 0,
          );
          //if the project already exists, we show an error
          if (newData === "praldreadyexists") {
            setError("nombre", {
              type: "manual",
              message: `Ya guardaste este proyecto`,
            });
          }
          //If the data is sent correctly, we show a success message
          else {
            // setCount(count + 1);
            // setUserTableData(["Dato añadido" + count]);
            mutate();
            setSubmitted(true);
            //Close the dialog
            setTimeout(() => {
              setIsOpen(false);
            }, 1000);
          }
        } else {
          console.log("No guzma");
        }
      }
      //If not all needed values are filled, we show respective error
      else {
        if (backendValues.idProyecto === 0) {
          setError("nombre", {
            type: "manual",
            message: `Nombre es obligatorio`,
          });
        }
        if (backendValues.id_decision_proyecto === 0) {
          setError("id_decision_proyecto", {
            type: "manual",
            message: `Decision es obligatorio`,
          });
        }
      }
    }

    //Form is in update mode
    if (type === "update") {
      const backendValuesUpdate = {
        id4e: Number(values.id4e),
        id_decision_proyecto: Number(values.id_decision_proyecto),
        idExchange: Number(values.idExchange),
        idSectoradd: values.sectores,
        precioEntrada: parseFloat(values.precioEntrada.replace(",", ".")),
        id: data?.id_proyecto,
      };

      const newData = await handleUpdateProyect(backendValuesUpdate);

      if (newData) {
        // setCount(count + 1);
        // setUserTableData(["Cambio de datos" + count]);
        mutate();
        setSubmitted(true);
        setTimeout(() => {
          setIsOpen(false);
        }, 700);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} action="">
        <div className="mx-auto w-4/5 mt-6 hidden md:block">
          {errors.nombre?.message === "Ya guardaste este proyecto" ? (
            <p className="bg-red-200 p-2 text-center text-red-700">
              Ya guardaste este proyecto. Elige otro!
            </p>
          ) : errors.nombre || errors.id_decision_proyecto ? (
            <p className="bg-red-200 p-2 text-center text-red-700">
              Por favor llena todos los campos
            </p>
          ) : null}
        </div>

        {submitted && (
          <>
            <div className="mx-auto w-4/5 mt-6 hidden md:block">
              <p className="bg-green-200 p-2 text-center text-green-700">
                Proyecto enviado!
              </p>
            </div>
          </>
        )}

        {/* All the form structured accordingly */}
        <div className={`space-y-6 md:flex `}>
          {/* If is create mode */}
          {type === "create" ? (
            <>
              {/* If user's first time, will show onboarding method */}
              {isOpenInstr ? (
                <>
                  {/* On boarding for mobile  */}
                  <div className="block md:hidden">
                    {defaultTab === "first-part" ? (
                      <>
                        <LeftSideForm
                          type={type}
                          symbol={symbol}
                          errors={errors}
                          setSymbol={setSymbol}
                          projectsList={projectsList ?? []}
                          clearErrors={clearErrors}
                          prInfo={prInfo}
                          rendimiento={rendimiento}
                        />
                        <EditablePrecio
                          type={type}
                          editablePrecio={editablePrecio}
                          setEditablePrecio={setEditablePrecio}
                        />
                      </>
                    ) : (
                      <RightSideForm
                        type={type}
                        editablePrecio={editablePrecio}
                        setEditablePrecio={setEditablePrecio}
                        errors={errors}
                        clearErrors={clearErrors}
                        decision={decision}
                        exchange={exchange}
                        sector={sector}
                        data4e={data4e}
                      />
                    )}
                  </div>

                  {/*On boarding for desktop */}

                  <div className="hidden md:block md:w-2/5 md:px-5 ">
                    <LeftSideForm
                      type={type}
                      symbol={symbol}
                      errors={errors}
                      setSymbol={setSymbol}
                      projectsList={projectsList ?? []}
                      clearErrors={clearErrors}
                      prInfo={prInfo}
                      rendimiento={rendimiento}
                    />
                  </div>
                  <div
                    className={`grid ${type === "create" ? "md:w-3/5 md:px-5 hidden md:grid gap-7 md:gap-4" : "w-full gap-4 md:gap-0 md:grid-cols-2"}`}
                  >
                    <RightSideForm
                      type={type}
                      editablePrecio={editablePrecio}
                      setEditablePrecio={setEditablePrecio}
                      errors={errors}
                      clearErrors={clearErrors}
                      decision={decision}
                      exchange={exchange}
                      sector={sector}
                      data4e={data4e}
                    />
                  </div>
                </>
              ) : (
                // If not first time, will show the form normally
                <>
                  {/* for mobile */}
                  <Tabs className="md:hidden" defaultValue={"first-part"}>
                    <TabsContent value="first-part">
                      <LeftSideForm
                        type={type}
                        symbol={symbol}
                        errors={errors}
                        setSymbol={setSymbol}
                        projectsList={projectsList ?? []}
                        clearErrors={clearErrors}
                        prInfo={prInfo}
                        rendimiento={rendimiento}
                      />
                      <EditablePrecio
                        type={type}
                        editablePrecio={editablePrecio}
                        setEditablePrecio={setEditablePrecio}
                      />

                      <TabsList>
                        <TabsTrigger
                          value="second-part"
                          className="absolute bottom-1 right-[-6px]"
                        >
                          <Button
                            variant="secondary"
                            className="font-bold "
                            disabled={!isReadyNextTab}
                          >
                            Siguiente
                          </Button>
                        </TabsTrigger>
                      </TabsList>
                    </TabsContent>
                    <TabsContent value="second-part">
                      <TabsList>
                        <TabsTrigger className="pl-0 " value="first-part">
                          Volver
                        </TabsTrigger>
                      </TabsList>
                      <div className="flex flex-col gap-5">
                        <RightSideForm
                          type={type}
                          editablePrecio={editablePrecio}
                          setEditablePrecio={setEditablePrecio}
                          errors={errors}
                          clearErrors={clearErrors}
                          decision={decision}
                          exchange={exchange}
                          sector={sector}
                          data4e={data4e}
                        />
                      </div>
                      <div
                        className={`${type === "create" ? "  md:flex" : "flex"}  justify-center mt-8`}
                      >
                        <Button
                          type="submit"
                          variant="secondary"
                          className={`w-4/5 font-bold submit-button`}
                        >
                          {type === "create" ? "Añadir" : "Actualizar"}
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                  {/* for desktop */}
                  <div className="hidden md:block md:w-2/5 md:px-5 md:border-r">
                    <LeftSideForm
                      type={type}
                      symbol={symbol}
                      errors={errors}
                      setSymbol={setSymbol}
                      projectsList={projectsList ?? []}
                      clearErrors={clearErrors}
                      prInfo={prInfo}
                      rendimiento={rendimiento}
                    />
                  </div>
                </>
              )}
            </>
          ) : null}
          {/* finished components only shownn in create mode */}

          {/* Components shown in both create and update mode */}

          {/* If user's first time, we show nothing cuz all to be shown is above */}
          {isOpenInstr ? null : (
            // If not first time, will show the form normally
            <div
              className={`grid ${type === "create" ? "md:w-3/5 md:px-5 hidden md:grid gap-7 md:gap-4" : "md:w-10/12 mx-auto md:px-5 md:gap-9 md:grid-cols-2"}`}
            >
              <RightSideForm
                type={type}
                editablePrecio={editablePrecio}
                setEditablePrecio={setEditablePrecio}
                errors={errors}
                clearErrors={clearErrors}
                decision={decision}
                exchange={exchange}
                sector={sector}
                data4e={data4e}
              />
            </div>
          )}
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

        <div className="mx-auto w-4/5 mt-6 block md:hidden">
          {errors.nombre?.message === "Ya guardaste este proyecto" ? (
            <p className="bg-red-200 p-2 text-center text-red-700">
              Ya guardaste este proyecto. Elige otro!
            </p>
          ) : errors.nombre || errors.id_decision_proyecto ? (
            <p className="bg-red-200 p-2 text-center text-red-700">
              Por favor llena todos los campos
            </p>
          ) : null}
        </div>

        {/*Botones*/}

        <div
          className={`${type === "create" ? " hidden md:flex" : "flex"}  justify-center mt-8`}
        >
          <Button
            type="submit"
            variant="secondary"
            className={`w-4/5 font-bold submit-button`}
          >
            {type === "create" ? "Añadir" : "Actualizar"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default DashboardDataForm;
