"use client";
//Imports for the component
//React
import React, { useEffect, useState } from "react";
//Next
import Link from "next/link";
import { TableData } from "@/index";
import { handleGetProyects } from "@/actions/proyectActions";
//Ui needed
import { Card, CardContent } from "../ui/card";
import { Badge } from "@/components/ui/badge";
//components
import Loading from "../shared/Loading";
import SkeletonListItem from "../shared/skeletons/SkeletonListItem";
//Hooks
import { useProjectId } from "@/hooks/useAnalisys";

const ListProjects = () => {
  const [projectsSaved, setProjectsSaved] = useState<TableData[]>([]);
  const [loading, setLoading] = useState(false);
  const { setProjectId } = useProjectId();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (
        typeof window !== undefined &&
        window.localStorage.getItem("guzma") !== null
      ) {
        const guzma = Number(window.localStorage.getItem("guzma"));
        console.log("guzma", guzma);
        // console.log('userid', userId)
        const data = (await handleGetProyects(guzma ?? 0)) as
          | TableData[]
          | string;
        if (typeof data === "string") {
          setProjectsSaved([]);
        } else {
          // // Crear un conjunto con los nombres de los proyectos ya tomados
          // const takenProjectsSet = new Set(data?.map((pr) => pr.proyecto));
          // // Filtrar projectList para incluir solo proyectos no tomados
          // const availableProjects =
          //   projectsList?.filter((pr) => !takenProjectsSet.has(pr.proyecto)) ||
          //   [];
          // setAvaliableProjects(availableProjects);

          setProjectsSaved(data);
        }
      }
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                project.hasAnalisis === 1 ? (
                <>
                  <Badge variant={"range"} color="green"><span className="hidden md:inline">Analizado</span></Badge>
                   <Link
                    href={`/analysis/${project.proyecto}/edit`}
                    onClick={() => setProjectId(project.id_proyectoInicial)}
                  >
                    <p className=" underline text-gray-200">Editar</p>
                  </Link>
                </>
                 
                ) : (
                  <>
                  <Badge variant={"range"} color="red"><span className="hidden md:inline">Sin analizar</span></Badge>
                    <Link
                      href={`/analysis/${project.proyecto}/add`}
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
