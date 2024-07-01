"use server";
import {
  postProyect,
  getProyects,
  deleteProyect,
  updateProyect,
} from "@/services/backend/proyects";
import { getProyectNumbers } from "@/services/coinmarketcap/info";
// import { cookies } from "next/headers";
import { TableData } from "@/index";

// function valuesFromCookies() {
//     const cookiesStore = cookies();
//     // const accessToken = cookiesStore.get('accessToken')?.value as string;
//     const userId = cookiesStore.get('userId')?.value;
//     // const userObject = userString ? JSON.parse(userString) : {id: 2};
//     // const {id} = userObject;
//     return {userId};
// }

export const handleGetProyects = async (userId: number) => {
  try {
    // const {userId} = valuesFromCookies();
    const response = await getProyects(userId);

    if (response.error) {
      return response.error as string;
    }

    const data: TableData[] = await Promise.all(
      response.proyectos.map(async (proyecto: any) => {
        const { ticker } = proyecto;
        const cleanTicker = ticker.replace("$", "");

        const b = await getProyectNumbers(cleanTicker);
        const c = b?.data?.[cleanTicker]?.quote?.USD;

        return {
          ...proyecto,
          market_cap: c?.market_cap || 0,
          price: c?.price || 0,
        };
      }),
    );
    return data;
  } catch (err: any) {
    console.error(err.message);
  }
};

export const handleSubmitProyectForm = async (
  formData: any,
  idUsuario: number,
) => {
  try {
    // const {userId} = valuesFromCookies();
    const posted = await postProyect({ ...formData, idUsuario });
    console.log("Que manda: ", posted);
    if (posted === 401) {
      return "praldreadyexists";
    } else {
      return true;
    }
  } catch (err) {
    console.error(err);
  }
};

export const handleDeleteProyect = async (id_proyecto: number | null) => {
  try {
    const dataToPass = {
      id_proyecto: id_proyecto,
    };
    const deleted = await deleteProyect(dataToPass);
    // if (deleted) {
    //     const newData = await getProyects(userId, userId)
    //     return newData;
    // }
    return deleted;
  } catch (err) {
    console.error(err);
  }
};

export const handleUpdateProyect = async (formData: any) => {
  try {
    const updated = await updateProyect(formData);
    // if (updated) {
    //     const newData = await getProyects(accessToken)
    //     return newData;
    // }
    return updated;
  } catch (err) {
    console.error(err);
  }
};
