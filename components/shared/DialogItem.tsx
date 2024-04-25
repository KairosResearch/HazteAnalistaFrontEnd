'use client';
import React, { useEffect, useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import DashboardDataForm from './DashboardDataForm';

import { DialogItemProps } from '@/index';

const DialogItem = (props: DialogItemProps) => {

   
    return (
        <Dialog>
            <DialogTrigger>
                {props.mode === 'edit' ? (
                    <>
                        <span className='absolute underline left-1 bottom-1 cursor-pointer text-xs text-green-light'>
                            Editar
                        </span>
                    </>
                ) : (
                    <div
                        className='hover:bg-card-foreground hover:text-card text-card-foreground rounded-lg px-4 py-2 text-sm font-bold
                        border border-input bg-background'
                        // variant='outline'
                    >
                        <p>
                            <span className='hidden md:inline'>Agregar proyecto</span>
                            <span> +</span>
                        </p>
                    </div>
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
                        )}
                    </DialogTitle>
                    <DialogDescription>
                        Configura tu proyecto
                    </DialogDescription>
                </DialogHeader>
                {props.mode === 'edit' ? (
                    <DashboardDataForm
                        catalogos={props.catalogos}
                        type='update'
                        data={props.data}
                    />
                    
                ) : (
                    <DashboardDataForm
                        catalogos={props.catalogos}
                        type='create'
                        data={null}
                    />
                )}
            </DialogContent>
        </Dialog>
    )
}

export default DialogItem