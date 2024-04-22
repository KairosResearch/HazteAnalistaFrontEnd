import { cookies } from "next/headers";

export const setUserId = async (user: {}) => {
    const cookiesStore = cookies();
    try {
        cookiesStore.set('user', JSON.stringify(user), {
            path: '/',
            sameSite: 'strict',
        })
    } catch (err) {
        throw new Error('No se pudo guardar la cookie');
    }
}

