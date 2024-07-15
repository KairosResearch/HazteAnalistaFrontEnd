import { AUTH_URL } from "./urls";

export const get4t = async () => {
  try {
    const response = await fetch(`${AUTH_URL}catalogo4t`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "reload",
    });
    const data = await response.json();
    const { calatalogo4t } = data;
    return calatalogo4t;
  } catch (err) {
    console.error(err);
  }
};

export const getDecision = async () => {
  try {
    const response = await fetch(`${AUTH_URL}catDecinesProyec`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });
    const data = await response.json();
    const { decesiproyecto } = data;
    return decesiproyecto;
  } catch (err) {
    console.error(err);
  }
};

export const getExchange = async () => {
  try {
    const response = await fetch(`${AUTH_URL}catexchange`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "reload",
    });
    const data = await response.json();
    const { exchages } = data;
    return exchages;
  } catch (err) {
    console.error(err);
  }
};

export const getSectores = async () => {
  try {
    const response = await fetch(`${AUTH_URL}catSectores`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "reload",
    });
    const data = await response.json();
    const { sectores } = data;
    return sectores;
  } catch (err) {
    console.error(err);
  }
};
