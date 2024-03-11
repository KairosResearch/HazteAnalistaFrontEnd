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
import { EditionItemForm } from './EditForm';

const EditProjectItem = () => {
   
    return (
        
            <Dialog>
                <DialogTrigger className='absolute underline right-2 bottom-2 cursor-pointer text-xs text-green-dark'>Editar</DialogTrigger>

                <DialogContent className='max-h-[50vh] md:max-h-full md:min-w-[80%] overflow-auto'>
                    <DialogHeader className='md:hidden'>
                        <DialogTitle className='text-xl'>Editar Proyecto</DialogTitle>
                        <DialogDescription>
                            Configura tu proyecto
                        </DialogDescription>
                    </DialogHeader>
                      <EditionItemForm />

                    <DialogFooter>
                        <DialogClose className='underline'>Cancelar</DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        
    )
}

export default EditProjectItem