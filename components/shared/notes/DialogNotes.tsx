import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";

// import TextEditor from './TextEditor';
import { useDialogsNotes } from '@/hooks/useDialogs';
  

const DialogNotes = () => {
    const {setIsOpenNote } = useDialogsNotes();
    
  return (
    <>
        <Dialog onOpenChange={(open) => setIsOpenNote(open)}>
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Tu nota para: </DialogTitle>
            </DialogHeader>
            {/* <TextEditor 

            /> */}
        </DialogContent>
        </Dialog>
    </>
  )
}

export default DialogNotes