import { handleUpdateNote } from "@/actions/notesActions";
import useSWR from "swr";

export const useNotes = (userId: number, noteId: number) => {
    const { data, error, mutate } = useSWR(['getNotes', userId, noteId], () => handleUpdateNote(userId, noteId));
    return {
        data,
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
}