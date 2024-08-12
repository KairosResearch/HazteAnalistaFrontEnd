import useSWR from "swr";
import { useMemo } from "react";

import { getBalances } from "@/services/backend/balances";
import { BalanceResponse } from "..";

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

