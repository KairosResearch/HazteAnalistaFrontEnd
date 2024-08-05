"use server";
import { cookies } from "next/headers";

const cookiesStore = cookies();

export const createCookieUserId = async (id: any) => {
  if (id != null) {
    try {
      // Verificar si la cookie ya existe
      const existingCookie = cookiesStore.get("userId");
      if (existingCookie) {
        console.log("La cookie ya existe");
        return false;
      }

      // Crear la cookie si no existe
      cookiesStore.set("userId", id, {
        path: "/",
        sameSite: "strict",
      });
      console.log("Cookie creada");
      return true;
    } catch (err) {
      throw new Error("No se pudo guardar la cookie");
    }
  }
  return null;
};


export const deleteCookieUserId = async () => {
    try {
        cookiesStore.delete('userId')
        return true;
    } catch (error) {
        console.error(error)
    }
}
