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
        ethereum: response.etehereum,
        base: response.base,
        polygon: response.polygon,	
        optimism: response.optimisum
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
    //Base, polygon and optimism
    const base = Object.entries(response.BasePositions[0].original) as EntriesFromResponseType[];
    const polygon = Object.entries(response.PolygonPositions[0].original) as EntriesFromResponseType[];
    const optimism = Object.entries(response.OptimisumPositions[0].original) as EntriesFromResponseType[];

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
    //Base, polygon and optimism
    const totalBalanceBaseArray = await sumBalances(base);
    const totalBalancePolygonArray = await sumBalances(polygon);
    const totalBalanceOptimismArray = await sumBalances(optimism);

    // Verificar los resultados intermedios
    
    console.log('TotalBalanceEthereumArray:', totalBalanceEthereumArray);

    // Sumar todos los valores en los arreglos resultantes
    const totalBalanceArbitrum = totalBalanceArbitrumArray.reduce((acc, obj) => acc + obj.totalBalance, 0);
    const totalBalanceScroll = totalBalanceScrollArray.reduce((acc, obj) => acc + obj.totalBalance, 0);
    const totalBalanceEthereum = totalBalanceEthereumArray.reduce((acc, obj) => acc + obj.totalBalance, 0);
    //Base, polygon and optimism
    const totalBalanceBase = totalBalanceBaseArray.reduce((acc, obj) => acc + obj.totalBalance, 0);
    const totalBalancePolygon = totalBalancePolygonArray.reduce((acc, obj) => acc + obj.totalBalance, 0);
    const totalBalanceOptimism = totalBalanceOptimismArray.reduce((acc, obj) => acc + obj.totalBalance, 0);

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
      },
      //Base, polygon and optimism
      base: {
        totalBalance: totalBalanceBase,
        totalBalanceArray: totalBalanceBaseArray,
        protocols: base
      },
      polygon: {
        totalBalance: totalBalancePolygon,
        totalBalanceArray: totalBalancePolygonArray,
        protocols: polygon
      },
      optimism: {
        totalBalance: totalBalanceOptimism,
        totalBalanceArray: totalBalanceOptimismArray,
        protocols: optimism
      }
    }


  } catch (error: any) {
    console.error(error.message);
  }
}