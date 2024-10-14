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
  const [arbPositions, setArbPositions] = React.useState<EntriesFromResponseType[]>();
  const [ethPositions, setEthPositions] = React.useState<EntriesFromResponseType[]>();
  const [scrollPositions, setScrollPositions] = React.useState<EntriesFromResponseType[]>();

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
      setArbPositions(defiPositions.arbitrum.protocols);
      setEthPositions(defiPositions.ethereum.protocols);
      setScrollPositions(defiPositions.scroll.protocols);
      setEmpty(false);
    } else {
      setEmpty(true);
    }
  }, [defiPositions]);

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
      {network === "arbitrum" && arbPositions &&
        arbPositions.map((item: EntriesFromResponseType, index) => (
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
        ethPositions && 
        ethPositions.map((item: EntriesFromResponseType, index) => (
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
        scrollPositions &&
        scrollPositions.map((item: EntriesFromResponseType, index) => (
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
    </>
  );
};

export default DefiPositionsCategories;
