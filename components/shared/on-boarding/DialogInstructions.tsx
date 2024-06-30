'use client';
import React, {useEffect} from 'react'

import { X } from 'lucide-react'
import { Button } from '../../ui/button';
import { instructionsSteps } from '@/utils';
import { useDialogInstructions, useDialogItem } from "@/hooks/useDialogs";





const DialogInstructions = () => {
    
    const [step, setStep] = React.useState(1)


    //we are going to open and close te form dialog
    const {  setIsOpen } = useDialogItem();
    const {isOpenInstr, setIsOpenInstr } = useDialogInstructions();




    useEffect(() => {
        // Este código se ejecuta solo en el lado del cliente después del montaje
        
          if (isOpenInstr) {
            if(step === 3){
              setIsOpen(true)
            }
            const elementsToFocus = [
              'mochila', 'cta', 'nombreblock', 'token', 'capblock',
              'editableblock', 'calcblock', '...', 'decisionblock', 'exchangeblock',
              'sectorblock', 'submit-button', 'decisionblock', 'exchangeblock',
            ];
            const elementId = elementsToFocus[step - 1];
            console.log('elementId', elementId);
              const elementToFocus = document.getElementById(elementId); // Usa el ID o clase del elemento
              if (elementToFocus) {
                
                  // Resaltar el elemento
                  elementToFocus.style.position = 'relative'; // O 'relative' dependiendo de tus necesidades
                  elementToFocus.style.zIndex = '1000'; // Mayor que cualquier otro contenido
                  elementToFocus.style.backgroundColor = 'rgb(43 43 43 / 0.95)'; // Color de fondo resaltado
                  elementToFocus.style.border = '3px solid #d9d9d9';
                  elementToFocus.style.pointerEvents = 'auto';
  
                  // Desplazar suavemente hacia el elemento
  
                  // Ajustar la posición del diálogo aquí si es necesario
                  // Esto puede depender de cómo estés manejando la posición del diálogo
              }
              return () => {
                const elementToFocus = document.getElementById(elementId);
                if (elementToFocus) {
                    elementToFocus.style.boxShadow = '';
                    elementToFocus.style.position = ''; // O 'relative' dependiendo de tus necesidades
                    elementToFocus.style.zIndex = ''; // Mayor que cualquier otro contenido
                    elementToFocus.style.backgroundColor = ''; // Color de fondo resaltado
                    elementToFocus.style.border = '';
                    elementToFocus.style.pointerEvents = '';
                }
            };
          }
        
       
        
        
    }, [isOpenInstr, step]);

    const nextStep = () => {
      if(step < instructionsSteps.length - 1 ){
        setStep(step + 1);
      } else {
        setIsOpenInstr(false)
      }
    }

  return (
    
   <div >
 
    {
      isOpenInstr && (
        <div className='fixed inset-0 z-50 bg-black bg-opacity-50 '>
          <div className="p-4 rounded-lg top-[55%] relative pointer-events-auto bg-dark-grey border-primary border-4 w-96 mx-auto">
            <button onClick={() => setIsOpenInstr(false)}>
              <X size={20} />

             </button>
           
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-center">
              
                
                  <span>{instructionsSteps.find((item) => item.id === step)?.title}</span>
                
              

            </h2>
           
          </div>
          <div className="p-4">
            
            <p
              className='text-sm font-semibold text-center mb-4'
            >
             
              <span>{instructionsSteps.find((item) => item.id === step)?.description}</span>
             
            </p>


            <div className='flex items-center justify-between'>
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
            </div>
        </div>
        
           
      )

    }
      
          

   </div>
  )
}

export default DialogInstructions