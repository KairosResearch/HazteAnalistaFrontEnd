import { ComparativeInfo } from "@/index";
import { AUTH_URL } from "./urls";

export const getComparativeMarketCap = async (token1: string, token2: string) : Promise<ComparativeInfo[] | undefined>=> {
  try {
    const response = await fetch(`${AUTH_URL}comparativaMarketCap/${token1}/${token2}/USD`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "reload",
    });
    const data = await response.json();
    const {comparativa} = data;
     
    return comparativa;
  } catch (err) {
    console.error(err);
  }
};