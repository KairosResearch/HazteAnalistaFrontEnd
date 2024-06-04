import React, {useState, useEffect} from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { X } from 'lucide-react'



import DialogAlert  from '@/components/shared/DialogAlert';
import DialogItem  from '@/components/shared/DialogItem';

import { DialogInfoProps, InfoTabsProps, ProyectsInfo } from '@/index';
import InfoTabs from './InfoTabs'
import { getProyectById } from '@/services/backend/proyectsInfo';


const DialogInfo = ({
    isDialogOpen,
    close,
    selectedRow,
    catalogos,
}: DialogInfoProps) => {


  //Pendiente...

  // Logica para buscar id de proyecto, no la primary key.
  //Tiene que ser el id del select...
  


  const [info, setInfo] = useState<ProyectsInfo | null >(null);
  useEffect(() => {
    const getInfo = async () => {
      const info: ProyectsInfo = await getProyectById(selectedRow?.id_proyecto ?? 0); 
      console.log('info', info)

      setInfo(info);
    }
    getInfo();
  }, []);




  return (

    <Dialog open={isDialogOpen} >
        <DialogContent className='px-3 xl:px-16 xl:py-5 max-h-[50vh] md:max-h-full md:min-w-[80%] overflow-auto'>
          
          {selectedRow && (
            <>
              <DialogHeader className='flex justify-between md:items-center flex-col md:flex-row md:mr-5'>
                <DialogTitle
                  className='text-left md:text-center text-xl md:text-2xl xl:text-4xl font-bold'
                >
                  Proyecto: {selectedRow.proyecto} | {info?.ticker}
                </DialogTitle>
                <p className="underline">{info?.website}</p>


                <div className='flex gap-3'>
                  
                    <DialogItem
                          projectsList={null}
                          mode="edit"
                          catalogos={catalogos}
                          data={{
                            ...selectedRow, 
                            id4e: selectedRow.id4e?.toString(),
                            id_decision_proyecto: selectedRow.id_decision_proyecto?.toString(),
                            idSector: selectedRow.idSector?.toString(),
                            idExchange: selectedRow.idExchange?.toString()
                          }}
                          close={close}
                      />
                  
                  
                      <DialogAlert
                        action="deleteProyect"
                        id={selectedRow.id_proyecto}
                        name={selectedRow.proyecto}
                        close={close}
                      />
                
                    
                </div>
                  <X 
                    className='absolute top-2 right-2 cursor-pointer hover:text-red-500'
                    onClick={close}>

                  </X>
              </DialogHeader>
            

            {
              (info != null) && (
                <InfoTabs 
                  info={info}
                />
              )
            }
             
              
            </>

          )}

          {/* <DialogClose
            onClick={close}
          >
              Cerrar
          </DialogClose> */}
        </DialogContent>
        
      </Dialog>
    
  )
}

export default DialogInfo