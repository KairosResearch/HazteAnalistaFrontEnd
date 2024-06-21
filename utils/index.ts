import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {POP, MID, LARGE, LOW} from '../lib/constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout | null = null;

  // La función debounced
  const debouncedFunction = (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };

  // Función para cancelar el debounce
  debouncedFunction.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return debouncedFunction;
};

//Random number generator between 1.000.000 and 10.000.000.000
export const siAthCalculator = (precioEntrada: number, precioAth: number) => {
  return Math.floor(precioAth/precioEntrada) - 1;
};



export const rangeDesigner = (marketCap: number) => {
  if(marketCap <= 99999999) {//99.999.999
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

//---- Funcion que calcula el Rendimiento actual ----//
export const rendimientoCalculator = (precioEntrada: number, precioActual: number) => {
  return ((precioActual/precioEntrada) - 1) * 100;
}; 



//-----Default values---//

//For the :

//Data for default values
export const defaultValuesDashboardForm = {
  nombre: "",
  ticket: "",
  id4e: "",
  id_decision_proyecto: "",
  marketCap: 0,
  siAth: 0,
  idExchange: '1',
  idSector: '1',
  precioEntrada: 0,
  precioActual: 0,
};



//Icons for the form:
export const iconsForm = [
  {name: 'nombre', alt: 'nombre', icon: '/Proyecto.png'},
  {name: 'ticket', alt: 'ticker', icon: '/Ticker.png'},
  {name: 'id4e', alt: '4e', icon: '/4E.png'},
  {name: 'id_decision_proyecto', alt: 'decision', icon: '/Decision.png'},
  {name: 'idExchange', alt: 'exchange', icon: '/Exchange.png'},
  {name: 'idSector', alt: 'sector', icon: '/Sector.png'},
  {name: 'precioEntrada', alt: 'precio entrada', icon: '/Precio.png'},
]
export const iconsFormLeftSide = [
  {name: 'marketCap', alt: 'market cap', icon: '/cap.png'},
  {name: 'siAth', alt: 'si ath', icon: '/ATH.png'},
  {name: 'precioActual', alt: 'precio actual', icon: '/Precio.png'},
]



export const tableHeaders = [
  {name: 'Proyecto', icon:'/Proyecto.png', key: 'proyecto'},
  {name: 'Ticker', icon:'/Ticker.png', key: 'ticket'},
  // {name: '4E', icon:'', key: 'id4e'},
  {name: 'Decision', icon:'/Decision.png', key: 'id_decision_proyecto'},
  {name: 'Sector', icon:'/Sector.png', key: 'sector'},
  {name: 'Exchange', icon:'/Exchange.png', key: 'idExchange'},
  {name: 'Precio Entrada', icon:'/Precio.png', key: 'precioEntrada'},
  {name: 'Precio Actual', icon:'/Precio.png', key: 'precioActual'},
  {name: 'Rendimiento Actual', icon:'/ATH.png', key: 'siAth'},
  {name: 'Market Cap', icon:'/cap.png', key: 'marketCap'},
  {name: 'Rango', icon: '/Rango.png', key: 'rango'},
]


export const errorHandlerAuthForm =  (errMessage: string) => {
  if(errMessage === 'Credenciales inválidas'){
    return ('Credenciales inválidas')                        
  }
  if(errMessage === 'No se pudo guardar la cookie'){
      return ('No se pudo guardar la cookie')
  }
  if(errMessage === 'Token invalido, no se pudo traer el user data'){
      return ('Token invalido, no se pudo traer el user data')
  }
  if(errMessage === 'Servidor no responde en ruta de getUser'){
      return ('Servidor no responde en ruta de getUser')
  }
  if(errMessage === 'Servidor no responde!'){
      return ('Servidor no responde!')
  }
}