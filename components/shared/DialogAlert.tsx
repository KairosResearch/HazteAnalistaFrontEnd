'use client';
import React from 'react'
import { handleLogout } from '@/actions/logout';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"

interface DialogAlertProps {
    action: 'deleteProyect' | 'logout';
}

const DialogAlert = (props:DialogAlertProps) => {
    
  return (
    <>
        {props.action === 'deleteProyect' ? (
            <AlertDialog>
            <AlertDialogTrigger>
                <span className='absolute  right-2 bottom-1 cursor-pointer text-xs text-red-500'>
                    Eliminar
                </span>
            </AlertDialogTrigger>
            <AlertDialogContent className='w-96'>
                <AlertDialogHeader>
                <AlertDialogTitle>Seguro que quieres eliminar el proyecto</AlertDialogTitle>
                <AlertDialogDescription>
                    Elminiarás este proyecto de tu Dashboard de seguimiento
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className='my-3'>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction><Button variant='destructive' className='w-full'>Si, eliminar</Button></AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        ) : (
            <AlertDialog>
            <AlertDialogTrigger>
                <Button variant='destructive'>Logout</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className='w-96'>
                <AlertDialogHeader>
                <AlertDialogTitle>Seguro que quieres cerrar sesión</AlertDialogTitle>
                <AlertDialogDescription>
                    Cerrarás tu sesión y tendrás que volver a iniciar sesión
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className='my-3'>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction><Button variant='destructive' className='w-full' >Si, cerrar sesión</Button></AlertDialogAction>
                
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        )}


    </>

    

  )
}

export default DialogAlert