"use client";
import React, { useEffect, useState } from "react";
import { TableData } from "@/index";
import { handleGetProyects } from "@/actions/proyectActions";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Loading from "../shared/Loading";
import SkeletonListItem from "../shared/skeletons/SkeletonListItem";
import { useProjectId } from "@/hooks/useAnalisys";
import { useProjects } from "@/hooks/useProjects";

const ListProjects = () => {
  const [projectsSaved, setProjectsSaved] = useState<TableData[]>([]);
  const [loading, setLoading] = useState(false);
  const { setProjectId } = useProjectId();
  const [guzma, setGuzma] = useState<number | null>(null);
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage.getItem("guzma") !== null) {
      setGuzma(Number(window.localStorage.getItem("guzma")));
    }
  }, []);

  const { data: projects, isLoading } = useProjects(guzma ?? 0);

  useEffect(() => {
    if (guzma !== null) {
      setProjectsSaved(projects as TableData[]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guzma, projects]);

  useEffect(() => {
    if (guzma !== null) {
      setLoading(isLoading);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guzma, isLoading]);

  return (
    <div className="grid gap-4">
      {loading && (
        <div className="grid gap-8">
          <SkeletonListItem />
          <SkeletonListItem />
          <SkeletonListItem />
        </div>
      )}
      {projectsSaved?.map((project) => (
        <Card className="p-4" key={project.id_proyecto}>
          <div className="flex flex-row justify-between items-center ">
            <div className="flex gap-4 ">
              <h2 className="text-2xl pt-0 mt-0 text-green-light">
                {project.proyecto}
              </h2>
              <Badge
                variant={"fourE"}
                color={
                  project.id4e === 2
                    ? "yellow"
                    : project.id4e === 3
                      ? "orange"
                      : project.id4e === 4
                        ? "blue"
                        : project.id4e === 5
                          ? "green"
                          : "grey"
                }
              >
                {project.id4e === 1
                  ? "Ninguno"
                  : project.id4e === 2
                    ? "Encontrar"
                    : project.id4e === 3
                      ? "Estudiar"
                      : project.id4e === 4
                        ? "Ejecutar"
                        : "Evaluar"}
              </Badge>
            </div>

            <div className="flex gap-1 md:gap-4 ">
              {
                project.tieneAnalisisCualitativo || project.tieneAnalisisCuantitavivo ? (
                <>
                  <Badge variant={"range"} color="green"><span className="hidden md:inline">Analizado</span></Badge>
                   <Link
                    href={`/analysis/${project.proyecto}/edit/${project.id_analisis_cualitativo}/${project.id_analisis_cuantitativo}`}
                    onClick={() => setProjectId(project.id_proyectoInicial)}
                  >
                    <p className=" underline text-gray-200">Editar</p>
                  </Link>
                </>
                 
                ) : (
                  <>
                  <Badge variant={"range"} color="red"><span className="hidden md:inline">Sin analizar</span></Badge>
                    <Link
                      href={`/analysis/${project.proyecto}/add/0/0`}
                      onClick={() => setProjectId(project.id_proyectoInicial)}
                    >
                      <p className=" underline text-gray-200">Realizar análisis</p>
                    </Link>
                  </>
                  
                )

              }
              
              
            </div>
          </div>
          <CardContent>
            <p className="text-pretty text-primary-foreground/85">
              Market Cap: $ {project.market_cap}
            </p>
            <p className="text-pretty text-primary-foreground/85">
              Precio actual: $ {project.price}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ListProjects;
