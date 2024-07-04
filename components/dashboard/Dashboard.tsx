"use client";
import React, { useEffect, useState } from "react";
import { LOW, MID, LARGE } from "@/lib/constants";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardHeader from "./DashboardHeader";
import DialogInfo from "./DialogInfo";

import { Badge } from "../ui/badge";

//Calculous
import { rangeDesigner } from "@/utils";
import { rendimientoCalculator } from "@/utils";

//Hook de useUserData
// import { useUserData } from '@/hooks/useUserData';
import { useUserTableData } from "@/hooks/useUserData";
import { tableDataDefault } from "@/lib/data";

import { TableData } from "@/index";
import { DashboardProps } from "@/index";
import { handleGetProyects } from "@/actions/proyectActions";
import Loading from "../shared/Loading";
import { useDialogItem } from "@/hooks/useDialogs";
import DialogItem from "./form/DialogItem";

const Dashboard = ({ catalogos, projectsList }: DashboardProps) => {
  const [loading, setLoading] = useState(false);

  const { userTableData } = useUserTableData();

  const { setIsOpen } = useDialogItem();

  const [tableData, setTableData] = useState<TableData[]>([]);
  
  //State to handle the projectList so that user might only add a project 
  //that hasn't been added yet
  const [availableProjects, setAvaliableProjects] = useState(projectsList);

  //State for Dialog info about the projects
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);

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
        const data = await handleGetProyects(guzma ?? 0) as TableData[] | string;
        console.log("data", data);
        
        if (typeof data === "string") {
          setTableData([]);
        } else {
          // Crear un conjunto con los nombres de los proyectos ya tomados
          const takenProjectsSet = new Set(data?.map(pr => pr.proyecto));
          // Filtrar projectList para incluir solo proyectos no tomados
          const availableProjects = projectsList?.filter(pr => !takenProjectsSet.has(pr.proyecto)) || [];
          setAvaliableProjects(availableProjects);

          setTableData(data || []);
        }
      }
      setLoading(false);
    };
    fetchData();
  }, [userTableData]);

  const sectores = catalogos[3];

  const range = (marketCap: number) => {
    const a = rangeDesigner(marketCap);
    return a;
  };

  return (
    <div>
      <DialogItem
              projectsList={availableProjects}
              mode="add"
              catalogos={catalogos}
              data={null}
              close={null}
            />
      <Table id="mochila" className="border border-grey-light ">
        <DashboardHeader />

        <TableBody id="first-project">
          {/* If no data  */}
          {tableData && tableData.length === 0 && !loading && (
            <>
              <TableRow className="">
                <TableCell className="font-medium  " colSpan={11}>
                  <p className="pb-3 md:text-center">
                    No hay proyectos registrados.
                    <span
                      id="cta"
                      className="block md:inline-block"
                      onClick={() => setIsOpen(true)}
                    >
                      ¡Registra tu primer proyecto!
                    </span>
                  </p>
                </TableCell>
              </TableRow>
            </>
          )}
          {/* If loading */}
          {loading && (
            <TableRow className="">
              <TableCell className="font-medium  " colSpan={11}>
                <Loading />
              </TableCell>
            </TableRow>
          )}

          {/* Data directly manipulated by the user */}
          {tableData &&
            tableData.map((data) => (
              <TableRow
                className="divide-x-2 divide-y-2 divide-green-dark hover:bg-primary/10 cursor-pointer"
                key={data.id_proyecto}
                onClick={() => {
                  setSelectedRow(data);
                  setIsDialogOpen(true);
                }}
              >
                <TableCell className="font-medium border-2 border-green-dark relative">
                  <p className="">{data.proyecto}</p>
                </TableCell>

                {/* Ticker */}
                <TableCell className="whitespace-nowrap">
                  {data.ticker}
                </TableCell>
                {/******Metodo 4E**** */}
                <TableCell>
                  <Badge
                    variant="fourE"
                    color={
                      data.id4e === 1
                        ? "yellow"
                        : data.id4e === 2
                          ? "grey"
                          : data.id4e === 3
                            ? "blue"
                            : "green"
                    }
                  >
                    {data.id4e === 1
                      ? "Encontrar"
                      : data.id4e === 2
                        ? "Estudiar"
                        : data.id4e === 3
                          ? "Ejecutar"
                          : "Evaluar"}
                  </Badge>
                </TableCell>

                {/******Decision**** */}
                <TableCell>
                  <Badge
                    variant={
                      data.id_decision_proyecto === 2
                        ? "decisionWatchlist"
                        : data.id_decision_proyecto === 1
                          ? "desicionInvest"
                          : "desicionLeave"
                    }
                  >
                    {data.id_decision_proyecto === 1
                      ? "Invertir"
                      : data.id_decision_proyecto === 2
                        ? "Watchlist"
                        : "Descartar"}
                  </Badge>
                </TableCell>

                {/******Sector**** */}
                <TableCell>
                  {sectores.find(
                    (sector) => sector.value === data.idSector,
                  ) && (
                    <Badge>
                      {
                        sectores.find(
                          (sector) => sector.value === data.idSector,
                        )?.label
                      }
                    </Badge>
                  )}
                </TableCell>

                {/******Exchange**** */}
                <TableCell>
                  <Badge
                    variant={
                      data.idExchange === 1
                        ? "binance"
                        : data.idExchange === 2
                          ? "coinbase"
                          : "kraken"
                    }
                  >
                    {data.idExchange === 1
                      ? "Binance"
                      : data.idExchange === 2
                        ? "Coinbase"
                        : "Kraken"}
                  </Badge>
                </TableCell>

                {/******precio entrada**** */}
                <TableCell className="whitespace-nowrap">
                  $ {data.precioEntrada.toLocaleString()}
                </TableCell>

                {/****** precio actual**** */}
                <TableCell className="whitespace-nowrap">
                  $ {data.price.toLocaleString()}
                </TableCell>

                {/******Si ATH**** */}
                <TableCell>
                  {rendimientoCalculator(
                    data.precioEntrada,
                    data.price,
                  ).toFixed(2)}{" "}
                  %
                </TableCell>

                {/******Market Cap**** */}
                <TableCell className="whitespace-nowrap">
                  $ {data.market_cap.toLocaleString()}
                </TableCell>
                {/******Rango**** */}
                <TableCell>
                  <Badge
                    variant="range"
                    color={
                      range(data.market_cap) === MID
                        ? "blue"
                        : range(data.market_cap) === LOW
                          ? "orange"
                          : range(data.market_cap) === LARGE
                            ? "green"
                            : "brown"
                    }
                  >
                    {range(data.market_cap)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>

        {isDialogOpen && (
          <DialogInfo
            projectsList={projectsList}
            isDialogOpen={isDialogOpen}
            close={() => setIsDialogOpen(false)}
            selectedRow={selectedRow}
            catalogos={catalogos}
          />
        )}
      </Table>
    </div>
  );
};

export default React.memo(Dashboard);
