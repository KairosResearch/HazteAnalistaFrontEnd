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
import { EditionItemForm } from './EditionItemForm';
import { AddItemForm } from './AddItemForm';
import { Button } from '../ui/button';

interface DialogItemProps {
    mode: 'edit' | 'add';
}
const DialogItem = (props: DialogItemProps) => {
   
    return (
        
            <Dialog>
                <DialogTrigger >
                    {props.mode === 'edit' ? (
                        <span className='absolute underline right-2 bottom-2 cursor-pointer text-xs text-green-light'>
                            Editar
                        </span>
                    ) : (
                        <Button
                        className='hover:bg-card-foreground hover:text-card text-card-foreground rounded-lg px-4 py-2 text-sm font-bold'
                        variant='outline'  
                      >
                        <p>
                        <span className='hidden md:inline'>Agregar proyecto</span>
                        <span> +</span>
                        </p>
                      </Button>
                    )}
                </DialogTrigger>

                <DialogContent className='max-h-[50vh] md:max-h-full md:min-w-[80%] overflow-auto'>
                    <DialogHeader className='md:hidden'>
                        <DialogTitle className='text-xl'>
                        {props.mode === 'edit' ? (
                            <span>
                                Editar Proyecto    
                            </span>
                        ) : (
                            <span>
                                Agregar Proyecto
                            </span> 
                        )
                            
                        }
                            
                        </DialogTitle>
                        <DialogDescription>
                            Configura tu proyecto
                        </DialogDescription>
                    </DialogHeader>
                    {props.mode === 'edit' ? (
                        <EditionItemForm />
                    ) : (
                        <AddItemForm />
                    )}

                    <DialogFooter>
                        <DialogClose className='underline'>Cancelar</DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        
    )
}

export default DialogItem