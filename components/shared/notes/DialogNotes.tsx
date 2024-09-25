import React, { useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
import TextEditor from './TextEditor'; 

// import TextEditor from './TextEditor';
import { useDialogsNotes } from '@/hooks/useDialogs';
import { X } from 'lucide-react';
import { handleUpdateNote } from '@/actions/notesActions';

type DialogNotesProps = {
  nombreProyecto: string | null
}


const DialogNotes = ({ nombreProyecto}: DialogNotesProps) => {
    // const [initialValueEditor, setInitialValueEditor] = React.useState<string | null>(null);
    const {setIsOpenNote, isOpenNote, idProject, initialValue, setInitialValue } = useDialogsNotes();
    

    const updateNote = async (guzma: number, id:number, html: string) => {
      const updatedNote = await handleUpdateNote(guzma,  id, html);
      console.log('Nueva actializacons', updatedNote);
      if (updatedNote) {
        setInitialValue(updatedNote);
      }
    }
    
  return (
    <>
        <Dialog open={isOpenNote} >
        
          <DialogContent>
              <DialogHeader >
              <DialogTitle>Tu nota para: {nombreProyecto}</DialogTitle>
              <X className="absolute top-2 right-2 cursor-pointer hover:text-red-500" onClick={() => setIsOpenNote(false)}/>
              </DialogHeader>
              <TextEditor 
                id={idProject}
                // initialValue={initialValue}
                closeEditor={() => setIsOpenNote(false)}
                updateNote={updateNote}

              />
          </DialogContent>
        </Dialog>
    </>
  )
}

export default DialogNotes