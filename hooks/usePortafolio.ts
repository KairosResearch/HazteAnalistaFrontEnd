import useSWR from "swr";
import { useMemo } from "react";
import { create } from "zustand";
import { SelectNetworkProps } from "@/index";

import { getBalances, getDefiPositions } from "@/services/backend/balances";
import { BalancesResponse, DefiPositions } from "..";
import {
  handleGetBalances,
  handleGetPositions,
} from "@/actions/portfolioActions";

export const usePortafolio = (address: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    [`getPortafolio`, address],
    () => handleGetBalances(address),
  );

  const portafolio = useMemo(() => data as BalancesResponse, [data]);

  return {
    portafolio,
    isLoading,
    isError: error,
    mutate,
  };
};

export const useDefiPositions = (address: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    [`getDefiPositions/`, address],
    () => handleGetPositions(address),
  );

  const defiPositions = useMemo(() => data, [data]);

  return {
    defiPositions,
    isLoading,
    isError: error,
    mutate,
  };
};

export const useSelectNetwork = create<SelectNetworkProps>((set) => ({
  network: "arbitrum",
  setNetwork(newNetwork: string) {
    set({ network: newNetwork });
  },
}));
