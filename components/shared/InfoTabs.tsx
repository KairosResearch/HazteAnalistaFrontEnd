import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { InfoTabsProps } from "@/index";

const InfoTabs = ({ info }: InfoTabsProps) => {
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

        <ul className="flex gap-4 md:gap-5 items-center">
          {info.website && info.website != "N/A" && (
            <Link target="_blank" href={info.website}>
              <li>
                <Image src="/Web.png" alt="Home" height={75} width={75} />
              </li>
            </Link>
          )}
          {/* Documentacion */}
          {info.documentacion && info.documentacion != "N/A" && (
            <Link target="_blank" href={info.documentacion}>
              <li>
                <Image src="/Documento.png" alt="Home" height={75} width={75} />
              </li>
            </Link>
          )}

          {info.twitter && info.twitter != "N/A" && (
            <Link target="_blank" href={info.twitter}>
              <li>
                <Image src="/Twitter.png" alt="Home" height={75} width={75} />
              </li>
            </Link>
          )}
          {info.discord && info.discord != "N/A" && (
            <Link target="_blank" href={info.discord}>
              <li>
                <Image src="/Discord.png" alt="Home" height={75} width={75} />
              </li>
            </Link>
          )}
          {info.github && info.github != "N/A" && (
            <Link target="_blank" href={info.github}>
              <li>
                <Image src="/Github.png" alt="Home" height={75} width={75} />
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
        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-3">Análisis</h2>
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
      </TabsContent>
    </Tabs>
  );
};

export default InfoTabs;
