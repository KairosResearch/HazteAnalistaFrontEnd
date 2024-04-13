'use client';
import React, { useEffect, useState } from 'react'
import { getDecision, get4t, getExchange, getSectores } from '@/services/backend/catalogos';

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
//import { EditionItemForm } from './EditionItemForm';
//import { AddItemForm } from './AddItemForm';
import { Button } from '../ui/button';
import DashboardDataForm from './DashboardDataForm';

interface DialogItemProps {
    mode: 'edit' | 'add';
    catalogos: [][]
}
type DataType = {
    value: number;
    label: string;
};

const DialogItem = (props: DialogItemProps) => {
    // const [data4t, setData4t] = useState<DataType[]>([]);
    // const [decision, setDecision] = useState<DataType[]>([]);
    // const [exchange, setExchange] = useState<DataType[]>([]);
    // const [sector, setSector] = useState<DataType[]>([]);
    

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const data4t = await get4t();
    //         const decision = await getDecision();
    //         const exchange = await getExchange();
    //         const sector = await getSectores();
    //         setData4t(data4t || []);
    //         setDecision(decision || []);
    //         setExchange(exchange || []);
    //         setSector(sector || []);
    //     } 
    //     fetchData();
    // }, []);
    // const 
   
    return (
        
            <Dialog>
                <DialogTrigger >
                    {props.mode === 'edit' ? (
                        <>
                            {/* <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 512 512"
                                className='w-4 h-4 absolute  right-2 top-2 cursor-pointer'
                                fill='#10b981'
                                ><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg> */}
                            <span className='absolute underline left-2 bottom-1 cursor-pointer text-xs text-green-light'>
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
                        )
                            
                        }
                            
                        </DialogTitle>
                        <DialogDescription>
                            Configura tu proyecto
                        </DialogDescription>
                    </DialogHeader>
                    {props.mode === 'edit' ? (
                        <DashboardDataForm
                            catalogos={props.catalogos}
                            type='update'
                            data={null}
                        />
                    ) : (
                        <DashboardDataForm
                            catalogos={props.catalogos}
                            type='create'
                            data={null}
                        />
                    )}

                    <DialogFooter>
                        <DialogClose className='underline'>Cancelar</DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        
    )
}

export default DialogItem