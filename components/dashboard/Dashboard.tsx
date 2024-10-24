"use client";
//Imports for the component.
//React
import React, { useEffect, useState, Suspense } from "react";
import { LOW, MID, LARGE } from "@/lib/constants";
//components
import DialogInfo from "./info/DialogInfo";
import DashboardHeader from "./DashboardHeader";
import SkeletonTable from "../shared/skeletons/SkeletonTable";
import DialogItem from "./form/DialogItem";
//Values and utilities
import { TableData } from "@/index";
import { DashboardProps } from "@/index";
import { handleGetProyects } from "@/actions/proyectActions";
import { tableDataDefault } from "@/lib/data";
//Calculous
import { rangeDesigner } from "@/utils";
import { rendimientoCalculator } from "@/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

//hooks
import { useProjects } from "@/hooks/useProjects";
//Ui needed
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
//Hooks
import { useDialogItem } from "@/hooks/useDialogs";
import { useUserTableData } from "@/hooks/useUserData";
// import { useUserData } from '@/hooks/useUserData';

const Dashboard = ({ catalogos, projectsList }: DashboardProps) => {
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [guzma, setGuzma] = useState<number | null>(null);
  const [availableProjects, setAvaliableProjects] = useState(projectsList);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.localStorage.getItem("guzma") !== null
    ) {
      setGuzma(Number(window.localStorage.getItem("guzma")));
    }
  }, []);

  const { data: projects, isLoading } = useProjects(guzma ?? 0);

  useEffect(() => {
    if (guzma !== null) {
      setLoading(isLoading);
      setTableData(projects as TableData[]);
      if (typeof projects !== "string") {
        const takenProjectsSet = new Set(projects?.map((pr) => pr.proyecto));
        console.log("takenProjectsSet", takenProjectsSet);
        // Filtrar projectList para incluir solo proyectos no tomados
        const availableProjects =
          projectsList?.filter((pr) => !takenProjectsSet.has(pr.proyecto)) ||
          [];
        setAvaliableProjects(availableProjects);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guzma, isLoading, projects]);
  useEffect(() => {
    if (guzma !== null) {
      setLoading(isLoading);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guzma, isLoading]);

  const { userTableData } = useUserTableData();

  const { setIsOpen } = useDialogItem();

  const [prToDelete, setPrToDelete] = useState<number[]>([]);

  //State to handle the projectList so that user might only add a project
  //that hasn't been added yet

  //State for Dialog info about the projects
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);

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

      <Table id="mochila" className="border border-primary-foreground ">
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
                      className="block ml-5 md:inline-block rounded-sm p-3 bg-primary/65 text-muted hover:bg-primary/75 cursor-pointer"
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
            <>
              <SkeletonTable />
            </>
          )}

          {/* Data directly manipulated by the user */}
          {tableData &&
            tableData.map((data) => (
              <TableRow
                className=" dark:divide-green-dark divide-foreground dark:hover:bg-[#3B8A48]/10 hover:bg-[#1f1f1f]/10 cursor-pointer"
                key={data.id_proyecto}
              >
                <TableCell className="border-2 border-r-0 sticky left-[-1px] bg-darkerBackground/95 dark:bg-dark-grey/95 z-10">
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
                  className="font-medium sticky left-[2rem]  bg-darkerBackground/95 dark:bg-dark-grey/95 z-10"
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
                    variant={"fourE"}
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
                        ? "decisionSeguimiento"
                        : data.id_decision_proyecto === 3
                          ? "desicionInvertir"
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
                  className=""
                  onClick={() => {
                    setSelectedRow(data);
                    setIsDialogOpen(true);
                  }}
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Badge
                        variant={
                          sectores.find(
                            (sectorCat) => sectorCat.value === data.sectores[0],
                          )?.label as any
                        }
                      >
                        {
                          sectores.find(
                            (sectorCat) => sectorCat.value === data.sectores[0],
                          )?.label
                        }
                        {data.sectores.length > 1 ? "..." : ""}
                      </Badge>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {data.sectores.map((sector) => (
                        <DropdownMenuItem key={sector}>
                          <Badge
                            key={sector}
                            variant={
                              sectores.find(
                                (sectorCat) => sectorCat.value === sector,
                              )?.label as any
                            }
                          >
                            {
                              sectores.find(
                                (sectorCat) => sectorCat.value === sector,
                              )?.label
                            }
                          </Badge>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
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
                          : "kraken"
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
                  className="whitespace-nowrap"
                  onClick={() => {
                    setSelectedRow(data);
                    setIsDialogOpen(true);
                  }}
                >
                  {rendimientoCalculator(
                    data.precioEntrada,
                    data.price,
                  ).toLocaleString("en-US")}{" "}
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
