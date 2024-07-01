import { getUserData } from "@/services/backend/userData";
import { cookies } from "next/headers";

export const validateAccessToken = async () => {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;
  if (!accessToken) {
    throw new Error("No hay token de acceso");
  }

  console.log("accessToken", accessToken);

  if (accessToken) {
    const validation = await getUserData(accessToken);
    if (!validation) {
      throw new Error("Token invalido, no se pudo traer el user data");
    }
    if (validation.error) {
      if (validation.error === "fetch failed") {
        throw new Error("Servidor no responde en ruta de getUser");
      } else {
        throw new Error(validation.error);
      }
    }
    console.log(validation);

    return validation;
  }
};
