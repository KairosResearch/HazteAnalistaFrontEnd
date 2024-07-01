"use server";

import { BASE_URL } from "./urls";
export const getProyectNumbers = async (symbol: string) => {
  try {
    console.log("Llegando a getProyectNumbers");
    console.log("symbol", symbol);
    const parameters = {
      symbol: symbol,
      convert: "USD",
    };

    const qs = new URLSearchParams(parameters).toString();
    const request = `${BASE_URL}?${qs}`;
    const response = await fetch(request, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CMC_PRO_API_KEY": "a3d40011-8f49-4c61-8707-62b34bee12ea",
      },
      next: {
        revalidate: 180,
      },
    });
    const resData = await response.json();
    return resData;

    // let price, market_cap;

    // try {
    //     price = resData?.data?.[symbol]?.quote?.USD?.price;
    //     market_cap = resData?.data?.[symbol]?.quote?.USD?.market_cap;
    // } catch (error) {
    //     console.error("Error destructuring data: ", error);
    // }

    // return  {
    //     price: price || 0, // provide a default value in case price is undefined
    //     market_cap: market_cap || 0 // provide a default value in case market_cap is undefined
    // }
  } catch (err: any) {
    console.error(err.message);
    return { error: err.message };
  }
};
