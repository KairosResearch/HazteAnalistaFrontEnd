'use server';

import { BASE_URL } from "./urls";
export const getProyectNumbers = async (symbol: string) => {
    try{
        console.log('symbol', symbol)
        const parameters = {
            symbol: symbol,
            convert: 'USD'
          };
          
          const qs = new URLSearchParams(parameters).toString();
          const request = `${BASE_URL}?${qs}`;
        const response = await fetch(request, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-CMC_PRO_API_KEY': 'a3d40011-8f49-4c61-8707-62b34bee12ea'
            },
            cache: 'no-cache'
            
        })
        const resData = await response.json();
        const {data: {[symbol]: {quote: {USD: {price}}}}} = await resData;
        //MarketCap
        const {data: {[symbol]: {quote: {USD: {market_cap}}}}} = await resData;
        console.log(price)
        console.log(market_cap)
        return {
            price: price,
            market_cap: market_cap
        }
    } catch (err: any) {
        console.error(err.message)
        return {error: err.message}
    }
}