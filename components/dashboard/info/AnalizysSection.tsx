//Imports for the component.
//React
import React, { useEffect, useState } from 'react'
//Next
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
//Components
import { TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
//Hooks
import { useProjectId } from "@/hooks/useAnalysis";
//Values and utilities
import  {InfoTabsProps} from '@/index'
import { handleGetSingleAnalysis } from '@/actions/analisysActions';



const AnalizysSection = ({
  info, tieneAnalisisCualitativo, tieneAnalisisCuantitavivo, id_analisis_cualitativo, id_analisis_cuantitativo
}: InfoTabsProps) => {
  const router = useRouter()
  const { setProjectId } = useProjectId();
  const [cuantitativeTotal, setCuantitativeTotal] = useState(0);
  const [cualitativeTotal, setCualitativeTotal] = useState(0);
  // console.log('¿Este proyecto tiene análisis?', hasAnalisis)
  useEffect(() => {
    //Bringing the project analisys
    async function fetchDataAnalysis() {
      console.log(tieneAnalisisCualitativo, tieneAnalisisCuantitavivo);
      if (tieneAnalisisCuantitavivo || tieneAnalisisCualitativo) {

        const response = await handleGetSingleAnalysis(id_analisis_cualitativo, id_analisis_cuantitativo);
        console.log("recien", response);
        if (response) {
          if(tieneAnalisisCuantitavivo){
            setCuantitativeTotal(response.filteredCuantitative.suma[0]);
          }
          if(tieneAnalisisCualitativo){
            setCualitativeTotal(response.filteredCualitative.suma[0]);
          }
          
        } else {
          console.error("No se pudieron obtener los datos del análisis");
        }
      }
      // if (tieneAnalisisCualitativo) {
      //   const guzma = Number(window.localStorage.getItem("guzma"));
        
      //   const response = await handleGetSingleAnalisys(guzma, info.id);
      //   console.log("recien", response);
      //   if (response) {
      //     setCuantitativeTotal(response.filteredCuantitative.suma);
      //     setCualitativeTotal(response.filteredCualitative.suma);
      //   } else {
      //     console.error("No se pudieron obtener los datos del análisis");
      //   }
      // }
    }
    fetchDataAnalysis();
  }, [])


  return (
    <div>
        <div className="h-full">
          <div className="lg:my-16 xl:my-24 flex justify-center items-center">
            {(tieneAnalisisCuantitavivo || tieneAnalisisCualitativo) ? (
              <div className="grid lg:grid-cols-2">
              <div className="flex flex-col">
                <h2 className="flex items-center mt-0">
                  <Image
                    className="inline-block pr-1"
                    src={"/icons/table/cap.png"}
                    alt={"Promedio del proyecto"}
                    width={20}
                    height={20}
                  />{" "}
                  Promedio del proyecto:
                </h2>
                <div>
                  <p className="m-0 text-primary-foreground/90 text-xs">
                    Capitalización de mercado del proyecto
                  </p>
                </div>
                <div className="pl-5">
                  <span className={`text-gray-500`}>{

                    (cuantitativeTotal+cualitativeTotal)/2
                  }</span>
                </div>
              </div>

              

              <div className="flex flex-col">
                <h2 className="flex items-center mt-0">
                  <Image
                    className="inline-block pr-1"
                    src={"/icons/analisis/cualitativo.png"}
                    alt={"Promedio cualitativo del proyecto"}
                    width={20}
                    height={20}
                  />{" "}
                  Promedio cualitativo:
                </h2>
                <div>
                  <p className="m-0 text-primary-foreground/90 text-xs">
                    Esto en base a tu configuracion
                  </p>
                </div>
                <div className="pl-5">
                  <span className={`text-gray-500`}>{cualitativeTotal}</span>
                </div>
              </div>

              <div className="flex flex-col">
                <h2 className="flex items-center mt-0">
                  <Image
                    className="inline-block pr-1"
                    src={"/icons/analisis/cuantitativo.png"}
                    alt={"Promedio cuantitativo del proyecto"}
                    width={20}
                    height={20}
                  />{" "}
                  Promedio del proyecto:
                </h2>
                <div>
                  <p className="m-0 text-primary-foreground/90 text-xs">
                    En base a tu configuracion en la seccion de cuantitativos
                  </p>
                </div>
                <div className="pl-5">
                  <span className={`text-gray-500`}>{cuantitativeTotal}</span>
                </div>
              </div>
              <div className="flex  justify-center ">
                <Button
                  onClick={() => {
                    setProjectId(info.id);
                    router.push(`/analysis/${info.proyecto}/edit/${id_analisis_cualitativo}/${id_analisis_cuantitativo}`);
                  }}
                  className="w-5/12"
                >
                  Editar análisis
                </Button>
              </div>
            </div>
            ) : (
              <Button
                variant={"outline"}
                onClick={() => {
                  setProjectId(info.id);
                  
                  router.push(`/analysis/${info.proyecto}/add/0/0`);
                }}
              >
                Crea un análisis express
              </Button>
              
            )}

            <div></div>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-3">
              Realizado por Kairos Research:
            </h2>

            {info.link_analisis_kairos ? (
              <Link
                href={info.link_analisis_kairos}
                target="_blank"
                className="underline w-full mx-auto"
              >
                Visita nuestro Análisis
              </Link>
            ) : (
              <p>Estamos trabajando en este análisis!</p>
            )}
          </div>
        </div>

    </div>
  )
}

export default AnalizysSection