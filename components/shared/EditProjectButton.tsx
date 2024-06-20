'use client';
import React from 'react'
import { Button } from '../ui/button';
import { useDialogItem } from '@/hooks/useDialogs';

const EditProjectButton = () => {
    const {setIsOpen, isOpen, setMode} = useDialogItem();
  return (
    <>
            <span className="text-xs md:hidden text-green-light">Editar</span>
            <Button
              variant={"outline"}
              className="text-green-light hidden md:inline "
              onClick={() => {
                setMode("edit");
                setIsOpen(!isOpen);
              }}
            >
              Editar
            </Button>
          </>
  )
}

export default EditProjectButton