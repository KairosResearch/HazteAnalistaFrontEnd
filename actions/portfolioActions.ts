'use server';
import { getBalances, getDefiPositions } from "@/services/backend/balances";
 


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
        const response = await getDefiPositions(walletAddress);
        return {
            lockedArbitrum: response.lokedArbitrum,
            stackedArbitrum: response.stakedArbitrum,
            stackedScroll: response.stakedScroll,
            lockedScroll: response.lokedScroll,
            lockedEthereum: response.lokedEthereum,
            stackedEthereum: response.stakedEthereum
        };
    } catch (error: any) {
        console.error(error.message);
    }
}