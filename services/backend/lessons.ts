"use server";
import { AUTH_URL } from "./urls";


export const getLessons = async () => {
    try {
      const response = await fetch(`${AUTH_URL}getLecciones/1`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "force-cache",
      });
  
      const data = await response.json();
      return data.ModulosLecciones;

      
    } catch (err) {
      console.error(err);
    }
  };

export const getLessonsByUser = async (id: number) => {
  try {
    const response = await fetch(`${AUTH_URL}getLecciones/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data.isFinalizado;
  } catch (err) {
    console.error(err);
  }
}

export const saveLesson = async (body: any) => {
  try {
    const response = await fetch(`${AUTH_URL}update_leccion_estatus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}