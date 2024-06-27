import React, {useEffect} from 'react'
interface FirstStepProps {
    title: string;
    description: string;
}

const FirstStep = (
    {title, description}: FirstStepProps
) => {

    useEffect(() => {
      
            const elementToFocus = document.getElementById('mochila'); // Usa el ID o clase del elemento
            if (elementToFocus) {
                // Resaltar el elemento
                elementToFocus.style.position = 'relative'; // O 'relative' dependiendo de tus necesidades
                elementToFocus.style.zIndex = '1000'; // Mayor que cualquier otro contenido
                elementToFocus.style.backgroundColor = 'rgb(43 43 43 / 0.95)'; // Color de fondo resaltado
                elementToFocus.style.border = '3px solid #d9d9d9';
                elementToFocus.style.height = '25vh';

            }
        
        
        
    }, []);


  return (
    <>
      <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-center">
              
                
                  <span>{title}</span>
                
              

            </h2>
           
          </div>
          <div className="p-4">
            
            <p
              className='text-sm font-semibold text-center mb-4'
            >
             
              <span>{description}</span>
             
            </p>
            </div>
    </>
  
  )
}

export default FirstStep