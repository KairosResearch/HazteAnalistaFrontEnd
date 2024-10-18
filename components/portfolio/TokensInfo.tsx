"use client";
import React, { use, useEffect } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { usePortafolio } from "@/hooks/usePortafolio";
import SkeletonTable from "../shared/skeletons/SkeletonTable";
import { Balances } from "@/index";
import { useSelectNetwork } from "@/hooks/usePortafolio";

const TokensInfo = () => {
  const { network } = useSelectNetwork();

  const [address, setAddress] = React.useState("");
  const [tokensData, setTokensData] = React.useState<Balances[]>();
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const addr = window.localStorage.getItem("wallet");
    if (typeof window !== "undefined" && addr != null) {
      setAddress(addr);
    }
  }, []);
  const { portafolio, isLoading } = usePortafolio(address);

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isLoading]);
  useEffect(() => {
    if (portafolio) {
      switch (network) {
        case "ethereum":
          setTokensData(portafolio.ethereum.Balances);
          break;
        case "arbitrum":
          setTokensData(portafolio.arbitrum.Balances);
          break;
        case "scroll":
          setTokensData(portafolio.scroll.Balances);
          break;
      }
    }
  }, [portafolio, network]);

  return (
    <>
      {loading && <SkeletonTable />}

      {tokensData &&
        tokensData.map((token, index) => {
          return (
            <TableRow key={index}>
              <TableCell>
                <div className="flex gap-4 items-center ">
                  <Image
                    src={token.logo}
                    alt={token.simbolo}
                    width={40}
                    height={40}
                  />
                  <span>{token.simbolo}</span>
                </div>
              </TableCell>
              <TableCell>$ {token.valorUnitCrypto.toLocaleString()}</TableCell>
              <TableCell>{token.balanceCrypto.toLocaleString()}</TableCell>
              <TableCell>
                $ {token.balanceFiat.toFixed(2).toLocaleString()}
              </TableCell>
              {/* <TableCell>{token.USDValue}</TableCell> */}
            </TableRow>
          );
        })}
    </>
  );
};

export default TokensInfo;
