"use client";

//Imports for the component.
//React
import React, { useState, useEffect } from "react";
//Hooks
// import { useUserTableData } from "@/hooks/useUserData";
// import { useDialogItem, useDialogInstructions } from "@/hooks/useDialogs";
import { useProjects } from "@/hooks/useProjects";
//import { useTabsState } from "@/hooks/useTabs";
import { useAverages } from "@/hooks/useAnalysis";
// import { useProjectId } from "@/hooks/useAnalysis";
import { useRouter } from "next/navigation";

import Link from "next/link";
//Server actions for both adding and updating
import {
  handleCreateAnalysis,
  handleUpdateAnalysis,
} from "@/actions/analisysActions";
import CualitativeFields from "./CualitativeFields";
import CuantitativeFields from "./CuantitativeForm";

//Shadcn staff for forms
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Dialog, DialogHeader, DialogContent } from "@/components/ui/dialog";

//UI needed
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUp } from "lucide-react";
import { EditIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

//Values and utils
import { debounce } from "@/utils/index";

//Types:
import { AnalysisInitialValues } from "@/index";

import Loading from "../shared/Loading";

interface AnalysisFormProps {
  // type: "cual" | "cuant";
  mode: "add" | "edit-both" | "edit-cual" | "edit-cuant";

  data: any;
  initialValues: AnalysisInitialValues | null;
  cualId: number | null;
  cuantId: number | null;
}

const AnalysisForm = ({
  // type,
  mode,
  data,
  initialValues,
  cuantId,
  cualId,
}: AnalysisFormProps) => {
  const router = useRouter();

  const [guzma, setGuzma] = useState<number | null>(null);
  const dataCualitative = data[0];
  const dataCuantitative = data[1];

  const [buttonCual, setButtonCual] = useState(false);
  const [buttonCuant, setButtonCuant] = useState(false);

  const { setCaulitativePromedio, cualitativePromedio } = useAverages();
  const initialPromedioCual = mode === "add" ? 0 : cualitativePromedio / 2;
  const [cualitativeValues, setCualitativeValues] =
    useState<number>(initialPromedioCual);

  const { setCuantitativePromedio, cuantitativePromedio } = useAverages();
  const initialPromedioCuant = mode === "add" ? 0 : cuantitativePromedio / 2;
  const [cuantitativeValues, setCuantitativeValues] =
    useState<number>(initialPromedioCuant);

  const [success, setSuccess] = useState(false);
  // const [bigSuccess, setBigSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //For the initial values
  const a = initialValues?.filteredCualitative;
  const b = initialValues?.filteredCuantitative;

  const initialValuesForm =
    (mode === "edit-both" || mode === "edit-cual" || mode === "edit-cuant") &&
    a &&
    b
      ? {
          alianzas: a.alianzas,
          auditorias: a.auditoria,
          equipo: a.integrantesEquipo,
          financeCual: a.financiamiento,
          whitepaper: a.whitepapaer,
          roadmap: a.roadmap,
          comunidad: a.comunidad,
          casosUso: a.caso_uso,
          tokenomics: b.tokenomics,
          onChain: b.onChain,
          finance: b.finance,
          exchange: b.exchange,
        }
      : //If mode is add
        {
          alianzas: [],
          auditorias: [],
          equipo: [],
          financeCual: [],
          whitepaper: [],
          roadmap: [],
          comunidad: [],
          casosUso: [],
          tokenomics: [],
          onChain: [],
          finance: [],
          exchange: [],
        };

  // useEffect(() => {
  //   setCaulitativePromedio(a?.promedio ?? 0);
  //   setCuantitativePromedio(b?.promedio ?? 0);
  // }, []);
  //Defining the form
  const form = useForm({
    defaultValues: initialValuesForm,
  });

  //Para calcular promedio de cualitativos
  useEffect(() => {
    const debouncedFunction = debounce(() => {
      if (cualitativeValues > 0) {
        setCaulitativePromedio(cualitativeValues * 2);
      }
    }, 500);

    if (cualitativeValues) {
      debouncedFunction();
    }
    console.log("Cualitative Values", cualitativeValues);
    return () => debouncedFunction.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cualitativeValues]);

  //Para calcular promedio de cuantitativos
  useEffect(() => {
    const debouncedFunction = debounce(() => {
      if (cuantitativeValues > 0) {
        setCuantitativePromedio(cuantitativeValues * 2);
      }
    }, 500);

    if (cuantitativeValues) {
      debouncedFunction();
    }

    return () => debouncedFunction.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cuantitativeValues]);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.localStorage.getItem("guzma") !== null
    ) {
      setGuzma(Number(window.localStorage.getItem("guzma")));
    }
  }, []);

  const { mutateAnalysis } = useProjects(guzma ?? 0);

  // Submit handler
  async function onSubmit(values: any) {
    setIsLoading(true);
    const backendValuesCualitative = {
      idCasoUso: values.casosUso,
      idIntegrantesEquipo: values.equipo,
      idAuditoria: values.auditorias,
      idRoadmap: values.roadmap,
      idComunidad: values.comunidad,
      idFinanciamiento: values.financeCual,
      idWhitepapaers: values.whitepaper,
      idAlianzas: values.alianzas,
      suma: cualitativePromedio,
    };

    console.log("Backend Values Cualitative", backendValuesCualitative);
    //backend Values para cuantitativo
    const backendValuesCuantitative = {
      idTokenomic: values.tokenomics,
      idMovimientosOnChain: values.onChain,
      idMetricasExchange: values.exchange,
      idFinanciamiento: values.finance,
      suma: cuantitativePromedio,
    };
    console.log("Backend Values Cuantitative", backendValuesCuantitative);
    if (
      typeof window !== "undefined" &&
      window.localStorage.getItem("guzma") !== null
    ) {
      const guzma = Number(window.localStorage.getItem("guzma"));
      const projectId = Number(localStorage.getItem("projectId"));
      if (mode === "add") {
        console.log("Creando con estos values: ", values);
        const response = await handleCreateAnalysis(
          backendValuesCualitative,
          backendValuesCuantitative,
          guzma,
          projectId,
        );
        console.log("Response", response);
        if (response) {
          // Primero, mostrar el mensaje de éxito
          setSuccess(true);
          mutateAnalysis();

          // Luego, después de 1 segundo, ocultar el mensaje
          setTimeout(() => {
            setSuccess(false);
            router.push("/analysis");
          }, 2500);
          setIsLoading(false);
        }
      } else {
        console.log(cuantId);

        const response = await handleUpdateAnalysis(
          backendValuesCualitative,
          backendValuesCuantitative,
          guzma,
          projectId,
          cualId ?? 0,
          cuantId ?? 0,
        );
        console.log("Response", response);
        if (response) {
          // Primero, mostrar el mensaje de éxito
          setSuccess(true);
          // Luego, después de 1 segundo, ocultar el mensaje
          setTimeout(() => {
            setSuccess(false);
            router.push("/analysis");
          }, 2500);
          setIsLoading(false);
        }
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div
          className={`z-50 fixed bottom-16 xl:bottom-28 right-5 bg-primary text-dark-black dark:text-white py-2 px-4 rounded-lg shadow-lg
            transition-opacity duration-2500 ${success ? "opacity-100" : "opacity-0"}`}
          onAnimationEnd={() => setSuccess(false)}
        >
          Subido exitosamente!
        </div>

        <section className="mb-8">
          <Tabs defaultValue="cualitative">
            <TabsList>
              <TabsTrigger
                className="rounded-sm mr-3 border-primary border"
                value="cualitative"
              >
                Cualitativo
              </TabsTrigger>
              <TabsTrigger
                className="rounded-sm  border-primary border"
                value="cuantitative"
              >
                Cuantitativo
              </TabsTrigger>
            </TabsList>
            <TabsContent value="cualitative">
              <Card className="bg-grey-light/15 py-4 px-2 border-primary-foreground/40">
                <CardContent>
                  <h1 className="text-primary">Análisis cualitativo</h1>
                  <p>
                    Aquí se valoran los aspectos que aportan valor o ventaja a
                    cada proyecto, con el objetivo de identificar las mejores
                    condiciones para su éxito.
                  </p>
                  <CualitativeFields
                    mode={mode}
                    data={dataCualitative}
                    setCualitativeValues={setCualitativeValues}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="cuantitative">
              <Card className="bg-grey-light/15 py-4 px-2 border-primary-foreground/40">
                <CardContent>
                  <h1 className="text-primary">Análisis cuantitativo</h1>
                  <p>
                    Se evalúan métricas y datos que reflejan el desempeño del
                    proyecto, determinando si cuenta con bases sólidas para su
                    desarrollo a largo plazo.
                  </p>

                  <CuantitativeFields
                    mode={mode}
                    data={dataCuantitative}
                    setCuantitativeValues={setCuantitativeValues}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {isLoading && <Loading />}
        <Button
          type="submit"
          variant={"default"}
          size={"sm"}
          className={` 
             w-2/12  fixed right-4 dark:bg-primary bg-background text-foreground z-50 md:right-[4.5rem]  2xl:right-36 justify-center mx-auto mt-4 text-left top-40 md:top-32
         
          `}
        >
          {mode === "add" && <ArrowUp />}

          {mode === "edit-both" && <EditIcon />}
          <span className="hidden md:inline">Guardar</span>
        </Button>
      </form>
    </Form>
  );
};

export default AnalysisForm;
