'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
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
                        <span className='text-xs md:hidden text-green-light'>
                            Editar
                        </span>
                        <Button 
                            variant={'outline'} 
                            className='text-green-light hidden md:inline '
                        >
                            Editar
                        </Button>
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
                ) 
            }
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
                        close={props.close}
                        projectsList={null}
                    />
                    
                ) : (
                    <DashboardDataForm
                        catalogos={props.catalogos}
                        type='create'
                        data={null}
                        close={props.close}
                        projectsList={props.projectsList}
                    />
                )}
            </DialogContent>
        </Dialog>
    )
}

export default DialogItem