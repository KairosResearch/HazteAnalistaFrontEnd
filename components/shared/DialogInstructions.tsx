'use client';
import React, {useEffect} from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,  
    DialogClose
} from "@/components/ui/dialog"
import { X } from 'lucide-react'
const DialogInstructions = () => {
    const [open, setOpen] = React.useState(true)
    useEffect(() => {
        // Este código se ejecuta solo en el lado del cliente después del montaje
        if (open) {
            const elementToFocus = document.getElementById('mochila'); // Usa el ID o clase del elemento
            if (elementToFocus) {
                // Resaltar el elemento
                elementToFocus.style.boxShadow = '0 0 0 3px rgba(166, 153, 225, 0.5)';

                // Scroll al elemento si no está visible
                elementToFocus.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Ajustar la posición del diálogo aquí si es necesario
                // Esto puede depender de cómo estés manejando la posición del diálogo
            }
        }
        
        return () => {
            const elementToFocus = document.getElementById('mochila');
            if (elementToFocus) {
                elementToFocus.style.boxShadow = '';
            }
        };
    }, [open]);
  return (
    <Dialog open={open}>
        
        <DialogContent className='px-3 xl:px-16 xl:py-5 max-h-[50vh] md:max-h-full md:min-w-[80%] overflow-auto'>
          <DialogHeader className='flex justify-between md:items-center flex-col md:flex-row md:mr-5'>
            <DialogClose>
                <X
                    onClick={() => {
                        setOpen(false)
                    }
                    }
                ></X>
            </DialogClose>
            <DialogTitle
              className='text-left md:text-center text-xl md:text-2xl xl:text-4xl font-bold'
            >
              Instrucciones
            </DialogTitle>
          </DialogHeader>
          <div className='text-justify text-lg'>
            <p className='mb-2'>
              1. Selecciona el proyecto que deseas visualizar.
            </p>
            <p className='mb-2'>
              2. Haz clic en el botón "Ver detalles" para visualizar la información del proyecto.
            </p>
            <p className='mb-2'>
              3. Haz clic en el botón "Editar" para modificar la información del proyecto.
            </p>
            <p className='mb-2'>
              4. Haz clic en el botón "Eliminar" para eliminar el proyecto.
            </p>
          </div>
          
        </DialogContent>
      </Dialog>
  )
}

export default DialogInstructions