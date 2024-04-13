import {AUTH_URL} from './urls';

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

//Isnt working
export const logout = async (accessToken: string | undefined) => {
  try {
    const response = await fetch(`${AUTH_URL}logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
      const data = await response.json();
      return data;

  } catch (err) {
    console.error(err)
  }
}