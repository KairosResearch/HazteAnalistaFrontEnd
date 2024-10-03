

//Imports for the component.
//React
import React, {useEffect, useState}from "react";
//Next
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
//Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import NoteSection from "./NoteSection";
// import { Button } from "@/components/ui/button";
// import TextEditor from "../../shared/notes/TextEditor";
//Values and utilities
import { InfoTabsProps } from "@/index";
import AnalizysSection from "./AnalizysSection";

const InfoTabs = ({
  info,
  tieneAnalisisCualitativo,
  tieneAnalisisCuantitavivo,
  id_analisis_cualitativo,
  id_analisis_cuantitativo,
  nota
}: InfoTabsProps) => {

  const [editNotaOpen, setEditNotaOpen] = useState<boolean>(false);
  useEffect(() => {
    if (nota) {
      setEditNotaOpen(false);
    } else {
      setEditNotaOpen(true);
    }
  }, [nota]);

  return (
    <Tabs defaultValue="description">
      <TabsList className="pl-0 md:pl-1">
        <TabsTrigger className="pl-0 " value="description">
          Descripción
        </TabsTrigger>
        <TabsTrigger value="links">Links</TabsTrigger>
        <TabsTrigger value="finance">Financiamiento</TabsTrigger>
        <TabsTrigger value="analyzis">Análisis</TabsTrigger>
        <TabsTrigger value="notes">Notas</TabsTrigger>
      </TabsList>
      <div className="border-t border-grey-light"></div>
      <TabsContent className="min-h-[250px]" value="description">
        <h2 className="text-xl md:text-2xl font-bold mb-3">Descripción</h2>
        <div
          className="border rounded-sm p-2
                     bg-primary-foreground/80 text-dark-grey dark:text-foreground
                     w-[96%] mx-auto "
        >
          <p>{info.descripcion}</p>
        </div>
      </TabsContent>


      {/* -------Links ------ */}

      <TabsContent className="min-h-[250px]" value="links">
        <h2 className="text-xl md:text-2xl font-bold mb-3">Links</h2>

        <ul className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5 items-center">
          {info.website && info.website != "N/A" && (
            <Link target="_blank" href={info.website}>
              <li className="dark:hover:bg-primary hover:bg-darkerBackground flex border border-black dark:border-foreground rounded-md gap-4 py-1 px-4 items-center justify-center">
                <Image
                  src="/icons/info/Web.png"
                  alt="Home"
                  height={20}
                  width={20}
                  className="hidden dark:inline"
                />
                <Image
                  src="/dark/icons/info/sitio-web.png"
                  alt="Home"
                  height={20}
                  width={20}
                  className="dark:hidden inline"
                />
                <span className="">Sitio web</span>
              </li>
            </Link>
          )}
          {/* Documentacion */}
          {info.documentacion && info.documentacion != "N/A" && (
            <Link target="_blank" href={info.documentacion}>
              <li className="dark:hover:bg-primary hover:bg-darkerBackground flex border border-black dark:border-foreground rounded-md gap-4 py-1 px-4 items-center justify-center">
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
              <li className="dark:hover:bg-primary hover:bg-darkerBackground flex border border-black dark:border-foreground rounded-md gap-4 py-1 px-4 items-center justify-center">
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
              <li className="dark:hover:bg-primary hover:bg-darkerBackground flex border border-black dark:border-foreground rounded-md gap-4 py-1 px-4 items-center justify-center">
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
              <li className="dark:hover:bg-primary hover:bg-darkerBackground flex border border-black dark:border-foreground rounded-md gap-4 py-1 px-4 7 items-center justify-center">
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
            <span>| $  {info.financiamiento.toLocaleString('en-US')}</span>
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
        <AnalizysSection
          info={info}
          tieneAnalisisCualitativo={tieneAnalisisCualitativo}
          tieneAnalisisCuantitavivo={tieneAnalisisCuantitavivo}
          id_analisis_cualitativo={id_analisis_cualitativo}
          id_analisis_cuantitativo={id_analisis_cuantitativo}
          nota={null}
        />
      </TabsContent>
      <TabsContent className="min-h-[250px]" value="notes">
        <h2 className="text-xl md:text-2xl mb-7 font-bold">Nota de proyecto:</h2>
        {/* <span className="text-xs text-gray-300 mb-3 ">Al crear o editar tu nota, cierra y abre nuevamente el proyecto para ver los cambios*.</span> */}
          <NoteSection id={info.id} />
        
      </TabsContent>
    </Tabs>
  );
};

export default InfoTabs;
