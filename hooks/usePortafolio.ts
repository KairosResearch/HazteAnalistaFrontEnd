import useSWR from "swr";
import { useMemo } from "react";
import { create } from "zustand";
import {SelectNetworkProps } from "@/index";

import { getBalances, getDefiPositions } from "@/services/backend/balances";
import { BalanceResponse, DefiPositions } from "..";

export const usePortafolio = (address: string) => {


      const { data, error, isLoading, mutate } = useSWR(
        `getPortafolio/${address}`,
        () => getBalances(address),
      );
   
      const portafolio = useMemo(() => data as BalanceResponse, [data]);


      return {
        portafolio,
        isLoading,
        isError: error,
        mutate,
      };
};

export const useDefiPositions = (address: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `getDefiPositions/${address}`,
    () => getDefiPositions(address),
  );

  const defiPositions = useMemo(() => data as DefiPositions, [data]);
  console.log('defiPositions en useHook:', defiPositions);

  return {
    defiPositions,
    isLoading,
    isError: error,
    mutate,
  };
}





export const useSelectNetwork = create<SelectNetworkProps>((set) => ({
  network: 'arbitrum',
  setNetwork(newNetwork: string) {
    set({ network: newNetwork });
  }
}));


