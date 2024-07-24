"use server";
import { AllModules, LessonProps } from "@/index";
import { AUTH_URL } from "./urls";

export const getLessons = async (): Promise<AllModules | undefined> => {
  try {
    const response = await fetch(`${AUTH_URL}getLecciones/1`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "reload",
    });

    const data = await response.json();
    return data.ModulosLecciones;
  } catch (err) {
    console.error(err);
  }
};

//This function is the fetcher for the SWR useLessonsHook.
//The key to that function is the url + the id of the user
export const getLessonsByUser = async (route: string) => {
  try {
    const response = await fetch(`${AUTH_URL}${route}`, {
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
};

export const getLastLesson = async (
  id: number,
): Promise<LessonProps | undefined> => {
  try {
    if (id === 0) return undefined;
    const response = await fetch(`${AUTH_URL}get_ultima_leccion/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    const lastLesson = data.UltimaLeccion[0];
    return lastLesson;
  } catch (err) {
    console.error(err);
  }
};

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
};

export const updateLastLesson = async (body: any) => {
  try {
    const response = await fetch(`${AUTH_URL}set_ultima_leccion`, {
      method: "PUT",
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
};
