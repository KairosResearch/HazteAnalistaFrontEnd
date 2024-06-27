'use client';
import React, {useEffect} from 'react'

import { X } from 'lucide-react'
import { Button } from '../ui/button';
import { instructionsSteps } from '@/utils';




const DialogInstructions = () => {
    const [open, setOpen] = React.useState(true)
    const [step, setStep] = React.useState(1)
    useEffect(() => {
        // Este código se ejecuta solo en el lado del cliente después del montaje
        if (open) {
            const elementToFocus = document.getElementById('mochila'); // Usa el ID o clase del elemento
            if (elementToFocus) {
                // Resaltar el elemento
                elementToFocus.style.position = 'fixed'; // O 'relative' dependiendo de tus necesidades
                elementToFocus.style.zIndex = '100'; // Mayor que cualquier otro contenido
                elementToFocus.style.backgroundColor = '#ff0000'; // Color de fondo resaltado
                elementToFocus.style.border = '3px solid #d9d9d9';
                elementToFocus.style.boxShadow = '0 0 5px 5px #d9d9d9';

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

    const nextStep = () => {
      if(step < instructionsSteps.length - 1 ){
        setStep(step + 1);
      } else {
        setOpen(false)
      }
    }

  return (
    
   <div className='fixed inset-0 z-20 bg-black bg-opacity-50'>
 
    {
      open && (
        <div className="p-4 rounded-lg top-32 bg-dark-grey border-primary border-2 w-96 mx-auto">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-center">
              
                
                  <span>{instructionsSteps.find((item) => item.id === step)?.title}</span>
                
              

            </h2>
            <button onClick={() => setOpen(false)}>
              <X size={20} />
            </button>
          </div>
          <div className="p-4">
            <p className="mb-4">Paso {step}</p>
            <p
              className='text-sm font-semibold text-center mb-4'
            >
             
              <span>{instructionsSteps.find((item) => item.id === step)?.description}</span>
             
            </p>

            <Button
              onClick={() => setStep(step - 1)}
              variant={'outline'}
            >
              Atras
            </Button>

            <Button
              onClick={nextStep}
            >
              Siguiente
            </Button>
            

            

            </div>
            </div>
           
      )

    }
      
          

   </div>
  )
}

export default DialogInstructions