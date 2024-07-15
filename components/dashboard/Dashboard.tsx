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
import { Checkbox } from "../ui/checkbox";

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

  const [prToDelete, setPrToDelete] = useState<number[]>([]);

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
        const data = (await handleGetProyects(guzma ?? 0)) as
          | TableData[]
          | string;
        if (typeof data === "string") {
          setTableData([]);
        } else {
          // Crear un conjunto con los nombres de los proyectos ya tomados
          const takenProjectsSet = new Set(data?.map((pr) => pr.proyecto));
          // Filtrar projectList para incluir solo proyectos no tomados
          const availableProjects =
            projectsList?.filter((pr) => !takenProjectsSet.has(pr.proyecto)) ||
            [];
          setAvaliableProjects(availableProjects);

          setTableData(data || []);
        }
      }
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userTableData]);

  console.log(prToDelete);

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
        <DashboardHeader
          prToDelete={prToDelete}
          clean={() => setPrToDelete([])}
        />

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
              >
                <TableCell className="">
                  <Checkbox
                    checked={prToDelete.includes(data.id_proyecto)}
                    onCheckedChange={(checked) => {
                      return checked
                        ? setPrToDelete([...prToDelete, data.id_proyecto])
                        : setPrToDelete(
                            prToDelete.filter(
                              (value) => value !== data.id_proyecto,
                            ),
                          );
                    }}
                  />
                </TableCell>
                <TableCell
                  onClick={() => {
                    setSelectedRow(data);
                    setIsDialogOpen(true);
                  }}
                  className="font-medium border-2 border-green-dark relative"
                >
                  <p className="">{data.proyecto}</p>
                </TableCell>

                {/* Ticker */}
                <TableCell
                  onClick={() => {
                    setSelectedRow(data);
                    setIsDialogOpen(true);
                  }}
                  className="whitespace-nowrap"
                >
                  {data.ticker}
                </TableCell>
                {/******Metodo 4E**** */}
                <TableCell
                  onClick={() => {
                    setSelectedRow(data);
                    setIsDialogOpen(true);
                  }}
                >
                  <Badge
                    color={
                      data.id4e === 2
                        ? "yellow"
                        : data.id4e === 3
                          ? "orange"
                          : data.id4e === 4
                            ? "blue"
                            : data.id4e === 5
                              ? "green"
                              : "grey"
                    }
                  >
                    {data.id4e === 1
                      ? "Ninguno"
                      : data.id4e === 2
                        ? "Encontrar"
                        : data.id4e === 3
                          ? "Estudiar"
                          : data.id4e === 4
                            ? "Ejecutar"
                            : "Evaluar"}
                  </Badge>
                </TableCell>

                {/******Decision**** */}
                <TableCell
                  onClick={() => {
                    setSelectedRow(data);
                    setIsDialogOpen(true);
                  }}
                >
                  <Badge
                    variant={
                      data.id_decision_proyecto === 2
                        ? "decisionWatchlist"
                        : data.id_decision_proyecto === 3
                          ? "desicionLeave"
                          : "Ninguno"
                    }
                  >
                    {data.id_decision_proyecto === 2
                      ? "Lista de seguimiento"
                      : data.id_decision_proyecto === 3
                        ? "Invertir"
                        : "Ninguno"}
                  </Badge>
                </TableCell>

                {/******Sector**** */}
                <TableCell
                  className="grid gap-2 py-1 px-2"
                  onClick={() => {
                    setSelectedRow(data);
                    setIsDialogOpen(true);
                  }}
                >
                  {data.sectores.map((sector) => (
                    <Badge
                      key={sector}
                      variant={
                        sectores.find((sectorCat) => sectorCat.value === sector)
                          ?.label as any
                      }
                    >
                      {
                        sectores.find((sectorCat) => sectorCat.value === sector)
                          ?.label
                      }
                    </Badge>
                  ))}
                </TableCell>

                {/******Exchange**** */}
                <TableCell
                  onClick={() => {
                    setSelectedRow(data);
                    setIsDialogOpen(true);
                  }}
                >
                  <Badge
                    variant={
                      data.idExchange === 2
                        ? "binance"
                        : data.idExchange === 3
                          ? "coinbase"
                          : data.idExchange === 4
                            ? "kraken"
                            : "decisionWatchlist"
                    }
                  >
                    {data.idExchange === 2
                      ? "Binance"
                      : data.idExchange === 3
                        ? "Coinbase"
                        : data.idExchange === 4
                          ? "Kraken"
                          : "Ninguno"}
                  </Badge>
                </TableCell>

                {/******precio entrada**** */}
                <TableCell
                  onClick={() => {
                    setSelectedRow(data);
                    setIsDialogOpen(true);
                  }}
                  className="whitespace-nowrap"
                >
                  $ {data.precioEntrada.toLocaleString()}
                </TableCell>

                {/****** precio actual**** */}
                <TableCell
                  onClick={() => {
                    setSelectedRow(data);
                    setIsDialogOpen(true);
                  }}
                  className="whitespace-nowrap"
                >
                  $ {data.price.toLocaleString()}
                </TableCell>

                {/******Si ATH**** */}
                <TableCell
                  onClick={() => {
                    setSelectedRow(data);
                    setIsDialogOpen(true);
                  }}
                >
                  {rendimientoCalculator(
                    data.precioEntrada,
                    data.price,
                  ).toFixed(2)}{" "}
                  %
                </TableCell>

                {/******Market Cap**** */}
                <TableCell
                  onClick={() => {
                    setSelectedRow(data);
                    setIsDialogOpen(true);
                  }}
                  className="whitespace-nowrap"
                >
                  $ {data.market_cap.toLocaleString()}
                </TableCell>
                {/******Rango**** */}
                <TableCell
                  onClick={() => {
                    setSelectedRow(data);
                    setIsDialogOpen(true);
                  }}
                >
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
