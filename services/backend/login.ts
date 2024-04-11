import { redirect } from 'next/navigation';
import {AUTH_URL} from './urls';

// export const getLogin = async () =>  {
//   const response = await fetch( `${BASE_URL}login`);
//   const data = await response.json();
//   return data;
// }
export const postLogin = async (values: any) => {
  try {
    const response = await fetch(`${AUTH_URL}login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    });
    const data = await response.json();
    
    return data;
    
  } catch (err) {
    console.error(err)
  }
}
