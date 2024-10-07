'use server';
import { getBalances, getDefiPositions } from "@/services/backend/balances";
import { DefiPositions } from "..";
 


export const handleGetBalances = async (walletAddress: string) => {
  try {
    console.log('Hace la llamada a getBalances');
    const response = await getBalances(walletAddress);
    return {
        arbitrum: response.arbitrum,
        scroll:   response.scroll,
        ethereum: response.etehereum
    };
  } catch (err: any) {
    console.error(err.message);
  }
}

export const handleGetPositions = async (walletAddress: string) => {
    try {
        const response = await getDefiPositions(walletAddress) as DefiPositions;
        return {
            arbitrum: response.ArbPositions[0].original,
            scroll:   response.ScrollPositions[0].original,
            ethereum: response.EthereumPositions[0].original
        }
        ;
    } catch (error: any) {
        console.error(error.message);
    }
}