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
};

export const getLastLesson = async (
  id: number,
): Promise<LessonProps | undefined> => {
  try {
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
