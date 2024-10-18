"use client";
import React, { useEffect } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { Protocol } from "@/index";
import { Badge } from "@/components/ui/badge";

type DefiPositionProps = {
  data: Protocol[];
};

const DefiPosition = ({ data }: DefiPositionProps) => {
  const [totalFiatValueState, setTotalFiatValueState] = React.useState(0);

  const [arrayToShow, setArrayToShow] = React.useState<Protocol[][][]>([]);
  const [arrayType1, setArrayType1] = React.useState<boolean>(false);
  const [arrayType2, setArrayType2] = React.useState<boolean>(false);
  const [arrayType3, setArrayType3] = React.useState<boolean>(false);

  useEffect(() => {
    if (data) {
      // Agrupar por position_name
      const groupedByName = data.reduce(
        (acc, item) => {
          const key = item.positions.position_name;
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(item);
          return acc;
        },
        {} as { [key: string]: Protocol[] },
      );

      // Convertir el objeto en un arreglo de arreglos
      const groupedByNameArray = Object.values(groupedByName);

      // Filtrar para ver si tienen el mismo position_type
      const groupedByPositionType = groupedByNameArray.map((group) => {
        const grouped = group.reduce(
          (acc, item) => {
            const key = item.positions.position_type;
            if (!acc[key]) {
              acc[key] = [];
            }
            acc[key].push(item);
            return acc;
          },
          {} as { [key: string]: Protocol[] },
        );

        return Object.values(grouped);
      });

      setArrayToShow(groupedByPositionType);

      //Type 1: More than one position_name with the same position_type
      //Type 2: Same position_name. Every sub-array has different position_type (more complex type)

      if (groupedByPositionType.length > 1) {
        setArrayType1(true);
      } else {
        setArrayType2(true);
      }
      // else {
      //     setArrayType3(true)
      // }
    }
  }, [data]);

  return (
    <>
      {arrayType1 &&
        arrayToShow &&
        arrayToShow.map((position, index) => {
          return (
            <TableRow key={index} className="">
              <TableCell className="w-1/3">
                <div key={index} className="flex gap-1 items-center ">
                  {position[0].map((pos, index) => {
                    return (
                      <div key={index}>
                        <Image
                          className="dark:block hidden"
                          src={
                            pos.positions.icon_url
                              ? pos.positions.icon_url.url
                              : "/kairos-main.svg"
                          }
                          alt="Kairos"
                          width={30}
                          height={30}
                        />
                        <Image
                          className="dark:hidden block"
                          src={
                            pos.positions.icon_url
                              ? pos.positions.icon_url.url
                              : "/kairos-logo-light.svg"
                          }
                          alt="Kairos"
                          width={30}
                          height={30}
                        ></Image>
                      </div>
                    );
                  })}
                  <span className="ml-3">
                    {position[0][0].positions.position_name}
                  </span>
                </div>
              </TableCell>
              <TableCell className="w-1/3 flex flex-col ml-24  text center">
                {position[0].map((pos, index) => {
                  return (
                    <span key={index}>
                      {pos.positions.monto_loked.toFixed(3).toLocaleString()}{" "}
                      {pos.positions.simbolo}
                    </span>
                  );
                })}
              </TableCell>
              <TableCell className="w-1/3 text center">
                {
                  // Calcular el valor total de fiat_value
                  (() => {
                    const totalFiatValue = position[0].reduce((acc, pos) => {
                      return acc + (pos.positions.fiat_value ?? 0);
                    }, 0);

                    // Renderizar el resultado en un TableCell
                    return <>${totalFiatValue.toFixed(2).toLocaleString()}</>;
                  })()
                }
              </TableCell>
            </TableRow>
          );
        })}
      {arrayType2 &&
        arrayToShow &&
        arrayToShow[0].map((position, index) => {
          return (
            <>
              <TableRow key={index} className="relative">
                <TableCell className="w-1/3">
                  <Badge
                    className=" text-xs absolute top-2 left-0"
                    variant={"Defi"}
                  >
                    {position[0].positions.position_type === "deposit"
                      ? "Deposito"
                      : position[0].positions.position_type === "loan"
                        ? "Prestamo"
                        : position[0].positions.position_type === "reward"
                          ? "Recompensa"
                          : "Staked"}
                  </Badge>
                  <div key={index} className="flex gap-1 items-center mt-6">
                    {position.map((pos, index) => {
                      return (
                        <div key={index}>
                          <Image
                            className="dark:block hidden"
                            src={
                              pos.positions.icon_url
                                ? pos.positions.icon_url.url
                                : "/kairos-main.svg"
                            }
                            alt="Kairos"
                            width={30}
                            height={30}
                          />
                          <Image
                            className="dark:hidden block"
                            src={
                              pos.positions.icon_url
                                ? pos.positions.icon_url.url
                                : "/kairos-logo-light.svg"
                            }
                            alt="Kairos"
                            width={30}
                            height={30}
                          ></Image>
                        </div>
                      );
                    })}
                    <span className="ml-3">
                      {position[0].positions.position_name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="w-1/3 flex flex-col ml-24 mt-6 text center">
                  {position.map((pos, index) => {
                    return (
                      <span key={index} className="w-full mx-auto ">
                        {pos.positions.monto_loked.toFixed(3).toLocaleString()}{" "}
                        {pos.positions.simbolo}
                      </span>
                    );
                  })}
                </TableCell>
                <TableCell className="w-1/3 text center">
                  {
                    // Calcular el valor total de fiat_value
                    (() => {
                      const totalFiatValue = position.reduce((acc, pos) => {
                        return acc + (pos.positions.fiat_value ?? 0);
                      }, 0);

                      // Renderizar el resultado en un TableCell
                      return <>${totalFiatValue.toFixed(2).toLocaleString()}</>;
                    })()
                  }
                </TableCell>
              </TableRow>
            </>
          );
        })}
    </>
  );
};

export default DefiPosition;
