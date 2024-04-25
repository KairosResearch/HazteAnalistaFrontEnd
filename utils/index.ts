import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {POP, MID, LARGE, LOW} from '../lib/constants'

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

//Random number generator between 1.000.000 and 10.000.000.000
export const randomMarketCap = () => {
  return Math.floor(Math.random() * 10000000000) + 1000000;
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
  idExchange: '',
  idSector: '',
  precioEntrada: 0,
  precioActual: 0,
};

//Data for the form:
export const defaultValuesAuthForm = {
  name: "",
  email: "",
  password: "",
  newPassword: "",
  rememberMe: false
};



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