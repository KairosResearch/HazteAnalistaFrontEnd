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

    {/** 
      if(!response.ok) {
      throw new Error('Invalid credentials');
    }
    */}
    

    const data = await response.json();
    return data;
    
  } catch (err: any) {
    console.error(err.message)
  }
}

export const postRegister = async (values: any) => {
  try {
    console.log(values)
    const response = await fetch(`${AUTH_URL}signup`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    });

    const data = await response.json();
    return data;
    
  } catch (err: any) {
    console.error(err.message)
    return { error: err.message}
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