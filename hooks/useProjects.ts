// hooks/useProjects.ts
import useSWR from "swr";
import {handleGetProyects} from "../actions/proyectActions";
import { useMemo } from "react";

export const useProjects = (userId: number) => {
    const { data, error, mutate } = useSWR(['getProjects', userId], () => handleGetProyects(userId));

//   const projects = useMemo(() => data || [], [data]);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate, // This function can be used to revalidate the data manually
  };
};