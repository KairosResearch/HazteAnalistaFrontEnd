'use server';
import { getBalances, getDefiPositions } from "@/services/backend/balances";
import { DefiPositions, Protocol, EntriesFromResponseType } from "..";

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
    const arbitrum = Object.entries(response.ArbPositions[0].original) as EntriesFromResponseType[];
    const scroll = Object.entries(response.ScrollPositions[0].original) as EntriesFromResponseType[];
    const ethereum = Object.entries(response.EthereumPositions[0].original) as EntriesFromResponseType[];

    // Función para sumar los balances de cada posición
    const sumBalances = async (entries: EntriesFromResponseType[]) => {
      return Promise.all(
        entries.map(async (protocolItem: EntriesFromResponseType) => {
          const protocolName: string = protocolItem[0];
          const protocol: Protocol[] = protocolItem[1];
          const totalBalance =  protocol.reduce((acc, item: Protocol) => {
            return acc + (item.positions.fiat_value ?? 0);
          }, 0);
          return {protocolName, totalBalance};
        })
      );
    };

    // Sumar los balances de cada red
    const totalBalanceArbitrumArray = await sumBalances(arbitrum);
    const totalBalanceScrollArray = await sumBalances(scroll);
    const totalBalanceEthereumArray = await sumBalances(ethereum);

    // Verificar los resultados intermedios
    
    console.log('TotalBalanceEthereumArray:', totalBalanceEthereumArray);

    // Sumar todos los valores en los arreglos resultantes
    const totalBalanceArbitrum = totalBalanceArbitrumArray.reduce((acc, obj) => acc + obj.totalBalance, 0);
    const totalBalanceScroll = totalBalanceScrollArray.reduce((acc, obj) => acc + obj.totalBalance, 0);
    const totalBalanceEthereum = totalBalanceEthereumArray.reduce((acc, obj) => acc + obj.totalBalance, 0);

    // Verificar los resultados finales
    console.log('Total Balance Arbitrum:', totalBalanceArbitrum);
    console.log('Total Balance Scroll:', totalBalanceScroll);
    console.log('Total Balance Ethereum:', totalBalanceEthereum);

    return {
      arbitrum: {
        totalBalance: totalBalanceArbitrum,
        totalBalanceArray: totalBalanceArbitrumArray,
        protocols: arbitrum
      },
      scroll: {
        totalBalance: totalBalanceScroll,
        totalBalanceArray: totalBalanceScrollArray,
        protocols: scroll
      },
      ethereum: {
        totalBalance: totalBalanceEthereum,
        totalBalanceArray: totalBalanceEthereumArray,
        protocols: ethereum
      }
    };

  } catch (error: any) {
    console.error(error.message);
  }
}