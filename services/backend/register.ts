import { AUTH_URL } from "./urls";

export const postRegister = async (values: any) => {
    try {
      const response = await fetch(`${AUTH_URL}signup`, {
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