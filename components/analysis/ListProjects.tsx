'use client';
import React, {useEffect, useState} from 'react'
import { TableData } from '@/index';
import { handleGetProyects } from '@/actions/proyectActions';
import { Card, CardContent } from '../ui/card';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import Loading from '../shared/Loading';


const ListProjects = () => {
  const [projectsSaved, setProjectsSaved] = useState<TableData[]>([]);
  const [loading, setLoading] = useState(false);
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
    <div className='grid gap-4'>
      {
        loading && <Loading />
      }
      {
        projectsSaved?.map((project) => (
          <Card className="px-4" key={project.id_proyecto}>
            <div  className="flex flex-row justify-between items-center">
            
              <Link 
                href={`/analisys/${project.proyecto}`}
                
              >
                <h2 className='text-2xl pt-0 underline text-green-light'>{project.proyecto}</h2>
              </Link>

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
            <CardContent>
              <p className='text-pretty text-primary-foreground/85'>Market Cap: $ {project.market_cap}</p>
              <p className='text-pretty text-primary-foreground/85'>Precio actual: $ {project.price}</p>
            </CardContent>
            
          </Card>
        ))
      }
    </div>
  )
}

export default ListProjects