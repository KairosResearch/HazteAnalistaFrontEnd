import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { X } from 'lucide-react'


import { Button } from "@/components/ui/button"
import DialogAlert  from '@/components/shared/DialogAlert';
import DialogItem  from '@/components/shared/DialogItem';

import { DialogInfoProps } from '@/index';
import InfoTabs from './InfoTabs'


const DialogInfo = ({
    isDialogOpen,
    close,
    selectedRow,
    catalogos,
}: DialogInfoProps) => {
  return (
    <div>
    <Dialog open={isDialogOpen} >
        <DialogContent className='px-3 xl:px-16 xl:py-5 max-h-[50vh] md:max-h-full md:min-w-[80%] overflow-auto'>
          
          {selectedRow && (
            <>
              <DialogHeader className='flex justify-between flex-col md:flex-row'>
                <DialogTitle
                  className='text-left md:text-center text-xl md:text-2xl font-bold'
                >Proyecto: Un proyecto{selectedRow.nombre}</DialogTitle>

                <div className='flex gap-3'>
                  
                    <DialogItem 
                          mode="edit"
                          catalogos={catalogos}
                          id={selectedRow.id_proyecto}
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
                        close={close}
                      />
                
                    
                </div>
                  <X 
                    className='absolute top-2 right-2 cursor-pointer hover:text-red-500'
                    onClick={close}>

                  </X>
              </DialogHeader>

              <InfoTabs />
              
            </>

          )}

          {/* <DialogClose
            onClick={close}
          >
              Cerrar
          </DialogClose> */}
        </DialogContent>
        
      </Dialog>
    </div>
  )
}

export default DialogInfo