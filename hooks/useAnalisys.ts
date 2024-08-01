import { create } from "zustand";

import { AveragesProps } from "@/index";

type ProjectIdProps = {
  projectId: number;
  setProjectId: (newState: number) => void;
  analisisCualitativeId: number;
  setAnalisisCualitativeId: (newState: number) => void;
  analisisCuantitativeId: number;
  setAnalisisCuantitativeId: (newState: number) => void;
};

export const useAverages = create<AveragesProps>((set) => ({
  cuantitativePromedio: 0,
  cualitativePromedio: 0,

  setCuantitativePromedio: (newState: number) =>
    set({ cuantitativePromedio: newState }),
  setCaulitativePromedio: (newState: number) =>
    set({ cualitativePromedio: newState }),
}));
export const useProjectId = create<ProjectIdProps>((set) => ({
  analisisCualitativeId: 0,
  setAnalisisCualitativeId:(newState: number) => {
    // Guardar en localStorage
    localStorage.setItem("idCualitative", newState.toString());
    // Actualizar el estado en Zustand
    set({ projectId: newState });
  },
  analisisCuantitativeId: 0,
  setAnalisisCuantitativeId: (newState: number) => {
    // Guardar en localStorage
    localStorage.setItem("idCuantitative", newState.toString());
    // Actualizar el estado en Zustand
    set({ projectId: newState });
  },
  projectId: 0,
  setProjectId: (newState: number) => {
    // Guardar en localStorage
    localStorage.setItem("projectId", newState.toString());
    // Actualizar el estado en Zustand
    set({ projectId: newState });
  },
}));
