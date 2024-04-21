import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {POP, MID, LARGE, LOW, BLUE} from './constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout | null;
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};


export const rangeDesigner = (marketCap: number) => {
  if(marketCap <= 99999999) {
    return POP;
  }
  if(marketCap >= 100000000 && marketCap <= 999999999) {
    return LOW;
  }
  if(marketCap >= 1000000000 && marketCap <= 9999999999) {
    return MID;
  }
  if(marketCap >= 10000000000) {
    return LARGE;
  }
}