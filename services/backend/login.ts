import {BASE_URL} from './urls';

export const getLogin = async () =>  {
  const response = await fetch( `${BASE_URL}login`);
  const data = await response.json();
  return data;
}
