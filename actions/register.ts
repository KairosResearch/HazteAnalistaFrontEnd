'use server';
import { postRegister } from "@/services/backend/login";

export const handleRegister = async (formData: any) => {
            const data = await postRegister(formData);
            if (data.message === 'Usuario creado correctamente!') {
                return data;
            }  
            if(data.error) {
                return data.error;
            }
    
}