"use client";
//Imports for the component.
//React
import React, { useEffect, useState } from "react";
import { TableData, ProjectsDataWithAnalisis } from "@/index";
//Next
import Link from "next/link";

import { handleGetProyects } from "@/actions/proyectActions";
//Ui needed
import { Card, CardContent } from "../ui/card";
import { Badge } from "@/components/ui/badge";
//components
import Loading from "../shared/Loading";
import SkeletonListItem from "../shared/skeletons/SkeletonListItem";
import { useProjectId } from "@/hooks/useAnalysis";
import { useProjects } from "@/hooks/useProjects";


const ListProjects = () => {
  const [projectsSaved, setProjectsSaved] = useState<ProjectsDataWithAnalisis[]>([]);
  const [loading, setLoading] = useState(false);
  const { setProjectId } = useProjectId();
  const [guzma, setGuzma] = useState<number | null>(null);
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage.getItem("guzma") !== null) {
      setGuzma(Number(window.localStorage.getItem("guzma")));
    }
  }, []);

  const { setNeedAnalysis, dataWithAnalisys: projects, isAnalysisLoading } = useProjects(guzma ?? 0);

  useEffect(() => {
   setNeedAnalysis(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (guzma !== null) {
      setProjectsSaved(projects as ProjectsDataWithAnalisis[]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guzma, projects]);

  useEffect(() => {
    if (guzma !== null) {
      setLoading(isAnalysisLoading);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guzma, isAnalysisLoading]);

  return (
    <div className="grid gap-4">
      {loading && (
        <div className="grid gap-8">
          <SkeletonListItem />
          <SkeletonListItem />
          <SkeletonListItem />
        </div>
      )}
      {
        projectsSaved?.length === 0 && !loading && (
          <div className="flex justify-center items-center h-64">
            <h2 className="text-2xl text-gray-200">No tienes proyectos guardados</h2>
          </div>
        )
      }
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
          {
                project.tieneAnalisisCualitativo || project.tieneAnalisisCuantitavivo ? (
                  <div>
                  <p>
                    Progreso del análisis:{(project.respuestaSegundoFetch.filteredCualitative.suma[0] + project.respuestaSegundoFetch.filteredCuantitative.suma[0]) /2} %
                  </p>
                  <p>
                    Progreso del análisis cualitativo: {project.respuestaSegundoFetch.filteredCualitative.suma} %
                  </p>
                  <p>
                      Progreso del análisis cuantitativo: {project.respuestaSegundoFetch.filteredCuantitative.suma} %
                  </p>
                </div>
                ): null}
            
            <p className="text-pretty text-primary-foreground/85">
              Market Cap: $ {project.market_cap.toLocaleString()}
            </p>
            <p className="text-pretty text-primary-foreground/85">
              Precio actual: $ {project.price.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ListProjects;
