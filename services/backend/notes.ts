'use server';
import { AUTH_URL } from "./urls";

// export const createNotes = async (body: any) => {
//     try {
//         const response = await fetch(`${AUTH_URL}createNotas`, {
//             method: 'POST',
//             headers: {
//             'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(body),
//         });

//         if (!response.ok) {
//             throw new Error('Failed to create note');
//         } else {
//             return response.json();
//         }
//     } catch (error) {
//         throw new Error('Failed to create note');
//     }
// }

export const getNote = async (idUser: number, idPr: number) => {
    try {
        const response = await fetch(`${AUTH_URL}getNota/${idUser}/${idPr}`, 
        {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
        }
        );
        if (!response.ok) {
            throw new Error('Failed to get note');
        } else {
            const data = await response.json();
            
            return data;
        }
    } catch (error) {
        throw new Error('Failed to get note');
    }
}

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

           throw new Error('Failed to edit note');
        } else {
            return response.json();
        }
        
    } catch (error) {
        throw new Error('Failed to update note');
        
    }
}