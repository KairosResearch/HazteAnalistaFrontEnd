"use client";
import React, { useEffect } from "react";
import DefiPosition from "@/components/portfolio/defi/DefiPositionTable";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useDefiPositions, useSelectNetwork } from "@/hooks/usePortafolio";
import SkeletonTable from "@/components/shared/skeletons/SkeletonTable";
import { DefiPositionsBody,EachNetwork, EntriesFromResponseType, Protocol } from "@/index";

const DefiPositionsCategories = () => {
  const [address, setAddress] = React.useState("");
  // const [arbPositions, setArbPositions] = React.useState<EntriesFromResponseType[]>();
  // const [ethPositions, setEthPositions] = React.useState<EntriesFromResponseType[]>();
  // const [scrollPositions, setScrollPositions] = React.useState<EntriesFromResponseType[]>();
  // const [basePositions, setBasePositions] = React.useState<EntriesFromResponseType[]>();
  // const [polygonPositions, setPolygonPositions] = React.useState<EntriesFromResponseType[]>();
  // const [optimismPositions, setOptimismPositions] = React.useState<EntriesFromResponseType[]>();
  const [positions, setPositions] = React.useState<EntriesFromResponseType[]>()

  const [loading, setLoading] = React.useState(false);

  const [totalFiat, setTotalFiat] = React.useState(0);
  const [empty, setEmpty] = React.useState(false);


  useEffect(() => {
    const addr = window.localStorage.getItem("wallet");
    if (typeof window !== "undefined" && addr != null) {
      setAddress(addr);
    }
  }, []);

  const { network } = useSelectNetwork();
  const { defiPositions, isLoading } = useDefiPositions(address);

  useEffect(() => {
    
    if (defiPositions) {
      switch (network) {
          case 'ethereum':
              setPositions(defiPositions.ethereum.protocols);
              break;
          case 'arbitrum':
              setPositions(defiPositions.arbitrum.protocols);
              break;
          case 'scroll':
              setPositions(defiPositions.scroll.protocols);
              break;
          case 'polygon':
              setPositions(defiPositions.polygon.protocols);
              break;
          case 'optimism':
              setPositions(defiPositions.optimism.protocols);
              break;
          case 'base':
              setPositions(defiPositions.base.protocols)
              break;
      }
      setEmpty(false);
  } else {
    setEmpty(true)
  }
  }, [defiPositions, network]);

    useEffect(() => {
        if (isLoading) {
        setLoading(true);
        } else {
        setLoading(false);
        }
    }, [isLoading]);

    
    const DefiTableHeader = () => {
        return (
          <TableHeader className="sticky  top-0 left-0 bg-darkerBackground dark:bg-dark-black z-10 text-center">
            <TableRow>

              <TableHead className="text-center">Pool</TableHead>
              <TableHead className="text-center">Monto</TableHead>
              <TableHead className="text-center">Valor en USD</TableHead>
            </TableRow>
          </TableHeader>
        );
      }


  return (
    <>
    {/* {
        empty && <div className="text-center text-xl">No hay posiciones en esta red</div>
    } */}

    {
          loading && <SkeletonTable />
      }
      {network === "arbitrum" && positions &&
        positions.map((item: EntriesFromResponseType, index) => (
          <article key={index}>
            <div className="bg-grey-light/10 relative">
              <Badge className="absolute left-[-10px] z-20 top-3">
                {item[0]}
              </Badge>
              <Table className="">
                <DefiTableHeader />
                <TableBody>
                  <DefiPosition data={item[1]} />
                </TableBody>
              </Table>
            </div>
          </article>
        ))
      }

      {network === "ethereum" &&
        positions && 
        positions.map((item: EntriesFromResponseType, index) => (
          <article key={index}>
            <div className="bg-grey-light/10 relative">
              <Badge className="absolute left-[-10px] z-20 top-3">
                {item[0]}
              </Badge>
              <Table className="">
              <DefiTableHeader />

                <TableBody>
                  <DefiPosition data={item[1]} />
                </TableBody>
              </Table>
            </div>
          </article>
        ))}

      {network === "scroll" &&
        positions &&
        positions.map((item: EntriesFromResponseType, index) => (
          <article key={index}>
            <div className="bg-grey-light/10 relative">
              <Badge className="absolute left-[-10px] z-20 top-3">
                {item[0]}
              </Badge>
              <Table className="">
              <DefiTableHeader />

                <TableBody>
                  <DefiPosition data={item[1]} />
                </TableBody>
              </Table>
            </div>
          </article>
        ))}
        {network === "base" && positions &&
        positions.map((item: EntriesFromResponseType, index) => (
          <article key={index}>
            <div className="bg-grey-light/10 relative">
              <Badge className="absolute left-[-10px] z-20 top-3">
                {item[0]}
              </Badge>
              <Table className="">
                <DefiTableHeader />
                <TableBody>
                  <DefiPosition data={item[1]} />
                </TableBody>
              </Table>
            </div>
          </article>
        ))
      }
      {network === "polygon" && positions &&
        positions.map((item: EntriesFromResponseType, index) => (
          <article key={index}>
            <div className="bg-grey-light/10 relative">
              <Badge className="absolute left-[-10px] z-20 top-3">
                {item[0]}
              </Badge>
              <Table className="">
                <DefiTableHeader />
                <TableBody>
                  <DefiPosition data={item[1]} />
                </TableBody>
              </Table>
            </div>
          </article>
        ))
      }
      {network === "optimism" && positions &&
        positions.map((item: EntriesFromResponseType, index) => (
          <article key={index}>
            <div className="bg-grey-light/10 relative">
              <Badge className="absolute left-[-10px] z-20 top-3">
                {item[0]}
              </Badge>
              <Table className="">
                <DefiTableHeader />
                <TableBody>
                  <DefiPosition data={item[1]} />
                </TableBody>
              </Table>
            </div>
          </article>
        ))
      }
    </>
  );
};

export default DefiPositionsCategories;
