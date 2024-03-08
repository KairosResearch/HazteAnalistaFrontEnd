'use client';
import React from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
    DialogFooter
  } from "@/components/ui/dialog"
import {ComboboxForm} from './EditForm';


const EditProjectItem = () => {
   
    return (
        
            <Dialog>
                <DialogTrigger className='absolute underline right-2 bottom-2 cursor-pointer text-xs text-green-dark'>Editar</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar Proyecto</DialogTitle>
                        <DialogDescription>
                            Configura tu proyecto
                        </DialogDescription>
                    </DialogHeader>
                      <ComboboxForm />

                    <DialogFooter>
                        <DialogClose>Cancelar</DialogClose>
                        <DialogClose>Editar</DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        
    )
}

export default EditProjectItem