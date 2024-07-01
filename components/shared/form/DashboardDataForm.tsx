"use client";
import React, { useState, useEffect } from "react";
//Hooks
import { useUserTableData } from "@/hooks/useUserData";
import { useDialogItem, useDialogInstructions } from "@/hooks/useDialogs";
import { useTabsState } from "@/hooks/useTabs";

//Types:
import { BackendValues, CatalogosType, DashboardDataFormProps } from "@/index";

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

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

//Values and utils
import {
  debounce,
  defaultValuesDashboardForm,
  rendimientoCalculator,
} from "@/utils/index";
import { getProyectNumbers } from "@/services/coinmarketcap/info";
import LeftSideForm from "./LeftSideForm";
import RightSideForm from "./RightSideForm";
import EditablePrecio from "./EditablePrecio";

//The component with its functionalities
const DashboardDataForm = ({
  type,
  data = null,
  catalogos,
  projectsList,
}: DashboardDataFormProps) => {
  console.log("LLEGUE A FORM JASJAJA");
  //Catalogos, separated as they come as an array
  const data4e = catalogos[0] as CatalogosType[];
  const decision = catalogos[1] as CatalogosType[];
  const exchange = catalogos[2] as CatalogosType[];
  const sector = catalogos[3] as CatalogosType[];

  //States for the right use of the form
  const [count, setCount] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [symbol, setSymbol] = useState("");
  const [editablePrecio, setEditablePrecio] = useState(0);
  const [rendimiento, setRendimiento] = useState(0);
  const { setUserTableData } = useUserTableData();
  const { isReadyNextTab, setIsReadyNextTab } = useTabsState();
  const { setIsOpen } = useDialogItem();

  //If is user's first time
  const { isOpenInstr, defaultTab } = useDialogInstructions();

  //States for setting errors using the hook
  const {
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();
  //Estados para el manejo de la data de coinmarketcap
  const [prInfo, setPrInfo] = useState({
    market_cap: 0,
    price: 0,
  });

  useEffect(() => {
    setIsReadyNextTab(false);
  }, []);

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

  //Difning the 'rendimiento' when editablePrice changes
  useEffect(() => {
    const debouncedFunction = debounce(() => {
      const rendimiento = rendimientoCalculator(editablePrecio, prInfo.price);
      setRendimiento(rendimiento);
    }, 1000);

    if (editablePrecio) {
      debouncedFunction();
    }

    return () => debouncedFunction.cancel();
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
        id4e: values.id4e,
        id_decision_proyecto: Number(values.id_decision_proyecto),
        marketCap: prInfo.market_cap ?? 0,
        idExchange: Number(values.idExchange),
        idSector: Number(values.idSector),
        precioActual: prInfo.price ?? 0,
        precioEntrada: editablePrecio ?? 0,
      };
      console.log("Backend values", backendValues);

      //Checking if all the values are filled
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
          console.log("Guzma", guzma);
          const newData = await handleSubmitProyectForm(
            backendValues,
            guzma ?? 0,
          );
          if (newData === "praldreadyexists") {
            setError("nombre", {
              type: "manual",
              message: `Ya guardaste este proyecto`,
            });
          } else {
            setCount(count + 1);
            setUserTableData(["Dato añadido" + count]);
            setSubmitted(true);

            setTimeout(() => {
              setIsOpen(false);
            }, 1000);
          }
        } else {
          console.log("No guzma");
        }
      } else {
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
        siAth: 0,
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
        setTimeout(() => {
          setIsOpen(false);
        }, 1000);
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

        <div className={`space-y-6 md:flex md:divide-x`}>
          {type === "create" ? (
            <>
              {/* If user's first time, will show onboarding method */}
              {isOpenInstr ? (
                <>
                  <div className="block md:hidden">
                    {defaultTab === "first-part" ? (
                      <>
                        <LeftSideForm
                          type={type}
                          symbol={symbol}
                          errors={errors}
                          setSymbol={setSymbol}
                          projectsList={projectsList}
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
                  <div className="hidden md:block md:w-2/5 md:px-5 ">
                    <LeftSideForm
                      type={type}
                      symbol={symbol}
                      errors={errors}
                      setSymbol={setSymbol}
                      projectsList={projectsList}
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
                <>
                  <Tabs className="md:hidden" defaultValue={"first-part"}>
                    <TabsContent value="first-part">
                      <LeftSideForm
                        type={type}
                        symbol={symbol}
                        errors={errors}
                        setSymbol={setSymbol}
                        projectsList={projectsList}
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
                          className="absolute bottom-8 right-3"
                        >
                          <Button
                            variant="secondary"
                            className="font-bold"
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

                  <div className="hidden md:block md:w-2/5 md:px-5 ">
                    <LeftSideForm
                      type={type}
                      symbol={symbol}
                      errors={errors}
                      setSymbol={setSymbol}
                      projectsList={projectsList}
                      clearErrors={clearErrors}
                      prInfo={prInfo}
                      rendimiento={rendimiento}
                    />
                  </div>
                </>
              )}
            </>
          ) : null}

          {isOpenInstr ? null : (
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
