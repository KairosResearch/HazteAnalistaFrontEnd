import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { InfoTabsProps } from "@/index";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const InfoTabs = ({ info }: InfoTabsProps) => {
  const router = useRouter();
  return (
    <Tabs defaultValue="description">
      <TabsList className="pl-0 md:pl-1">
        <TabsTrigger className="pl-0 " value="description">
          Descripcion
        </TabsTrigger>
        <TabsTrigger value="links">Links</TabsTrigger>
        <TabsTrigger value="finance">Financiamiento</TabsTrigger>
        <TabsTrigger value="analyzis">Analisis</TabsTrigger>
      </TabsList>
      <div className="border-t border-grey-light"></div>
      <TabsContent className="min-h-[250px]" value="description">
        <h2 className="text-xl md:text-2xl font-bold mb-3">Descripcion</h2>
        <div
          className="border rounded-sm p-2
                     bg-primary-foreground/80 text-dark-grey
                     w-[96%] mx-auto "
        >
          <p>{info.descripcion}</p>
        </div>
      </TabsContent>
      <TabsContent className="min-h-[250px]" value="links">
        <h2 className="text-xl md:text-2xl font-bold mb-3">Links</h2>

        <ul className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5 items-center">
          {info.website && info.website != "N/A" && (
            <Link target="_blank" href={info.website}>
              <li className="hover:bg-primary flex border rounded-md gap-4 py-1 px-4 items-center justify-center">
                <Image
                  src="/icons/info/Web.png"
                  alt="Home"
                  height={20}
                  width={20}
                />
                <span className="">Sitio web</span>
              </li>
            </Link>
          )}
          {/* Documentacion */}
          {info.documentacion && info.documentacion != "N/A" && (
            <Link target="_blank" href={info.documentacion}>
              <li className="hover:bg-primary flex border rounded-md gap-4 py-1 px-4 items-center justify-center">
                <Image
                  src="/icons/info/Documento.png"
                  alt="Home"
                  height={20}
                  width={20}
                />
                <span className="">Documentación </span>
              </li>
            </Link>
          )}

          {info.twitter && info.twitter != "N/A" && (
            <Link target="_blank" href={info.twitter}>
              <li className="hover:bg-primary flex border rounded-md gap-4 py-1 px-4 items-center justify-center">
                <Image
                  src="/icons/info/Twitter.png"
                  alt="Home"
                  height={20}
                  width={20}
                />
                <span className="">Twitter </span>
              </li>
            </Link>
          )}
          {info.discord && info.discord != "N/A" && (
            <Link target="_blank" href={info.discord}>
              <li className="hover:bg-primary flex border rounded-md gap-4 py-1 px-4 items-center justify-center">
                <Image
                  src="/icons/info/Discord.png"
                  alt="Home"
                  height={20}
                  width={20}
                />
                <span className="">Discord </span>
              </li>
            </Link>
          )}
          {info.github && info.github != "N/A" && (
            <Link target="_blank" href={info.github}>
              <li className="hover:bg-primary flex border rounded-md gap-4 py-1 px-4 7 items-center justify-center">
                <Image
                  src="/icons/info/Github.png"
                  alt="Home"
                  height={20}
                  width={20}
                />
                <span className=""> Github</span>
              </li>
            </Link>
          )}
        </ul>
      </TabsContent>
      <TabsContent className="min-h-[250px]" value="finance">
        <h2 className="text-xl md:text-2xl font-bold mb-3">
          Financiamiento{" "}
          {info.financiamiento && info.financiamiento != 0 ? (
            <span>| $ {info.financiamiento}</span>
          ) : (
            <span>| N/A</span>
          )}
        </h2>

        <section className="mb-7">
          {info.ultima_ronda && info.ultima_ronda != "N/A" && (
            <>
              <h2>Ultima ronda</h2>
              <p> - {info.ultima_ronda}</p>
            </>
          )}
        </section>

        <section>
          <h2>Inversionistas</h2>
          <ul className="grid gap-7 grid-cols-3 lg:grid-cols-4">
            <li>
              <Badge className="px-3">{info.inversionista1}</Badge>
            </li>
            <li>
              <Badge className="px-3">{info.inversionista2}</Badge>
            </li>
            <li>
              <Badge className="px-3">{info.inversionista3}</Badge>
            </li>
          </ul>
        </section>
      </TabsContent>
      <TabsContent className="min-h-[250px]" value="analyzis">
        <div className="h-full">
          <div className="my-16 xl:my-24 flex justify-center items-center">
            {false && (
              <Button variant={"outline"}>Crea un análisis express</Button>
            )}
            <div className="grid grid-cols-2">
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
                  <span className={`text-gray-500`}>100%</span>
                </div>
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={() => router.push(`/analisis/${info.proyecto}`)}
                  className="w-5/12">Editar análisis</Button>
              </div>

              <div className="flex flex-col">
                <h2 className="flex items-center">
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
                  <span className={`text-gray-500`}>100/1000</span>
                </div>
              </div>

              <div className="flex flex-col">
                <h2 className="flex items-center">
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
                  <span className={`text-gray-500`}>100/100</span>
                </div>
              </div>
            </div>
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
      </TabsContent>
    </Tabs>
  );
};

export default InfoTabs;
