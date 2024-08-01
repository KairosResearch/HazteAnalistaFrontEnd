'use server';
import { AUTH_URL } from "./urls";

export const updateNote = async (body: any) => {
    try {
        const response = await fetch(`${AUTH_URL}updateNotas`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        
        
        if (!response.ok) {
           
        } else {
            return response.json();
        }
        
    } catch (error) {
        throw new Error('Failed to update note');
        
    }
}