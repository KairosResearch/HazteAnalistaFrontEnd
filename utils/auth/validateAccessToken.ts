import { getUserData } from "@/services/backend/userData";
import { cookies } from "next/headers";

export const validateAccessToken = async () => {
    const cookiesStore = cookies();
    const accessToken = cookiesStore.get('accessToken')?.value;
    console.log('accessToken', accessToken)
    if (accessToken) {
        const validation = await getUserData(accessToken);
       console.log(validation);
       return validation;
    } else {
        return null;
    }
}

