import { handleUpdateNote } from "@/actions/notesActions";
import useSWR from "swr";

export const useNotes = (userId: number, noteId: number, note: string) => {
  const { data, error, mutate } = useSWR(["getNotes", userId, noteId], () =>
    handleUpdateNote(userId, noteId, note),
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
