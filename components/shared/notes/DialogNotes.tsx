import React from 'react'
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
  

const DialogNotes = () => {
    const {setIsOpenNote, isOpenNote, idProject } = useDialogsNotes();
    
  return (
    <>
        <Dialog open={isOpenNote} >
        
          <DialogContent>
              <DialogHeader >
              <DialogTitle>Tu nota para: proyecto con id: {idProject}</DialogTitle>
              <X className="absolute top-2 right-2 cursor-pointer hover:text-red-500" onClick={() => setIsOpenNote(false)}/>
              </DialogHeader>
              <TextEditor 
              id={idProject}
              initialValue={'<p>Texto inicial</p>'}
              closeEditor={() => setIsOpenNote(false)}

              />
          </DialogContent>
        </Dialog>
    </>
  )
}

export default DialogNotes