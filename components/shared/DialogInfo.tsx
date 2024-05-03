import React from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import DialogAlert  from '@/components/shared/DialogAlert';
import DialogItem  from '@/components/shared/DialogItem';

import { DialogInfoProps } from '@/index';
const DialogInfo = ({
    isDialogOpen,
    close,
    selectedRow,
    catalogos,
}: DialogInfoProps) => {
  return (
    <div>
    <Dialog open={isDialogOpen} >
        <DialogContent className='max-h-[50vh] md:max-h-full md:min-w-[80%] overflow-auto'>
          
          {selectedRow && (
            <div className='flex flex-col gap-2'>
              <div>
                <h1 
                  className='text-lg lg:text-2xl '
                >Proyecto: {selectedRow.nombre}</h1>
                <DialogDescription className='mt-3'>Detalles del proyecto</DialogDescription>
              </div>
              <div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt sapiente necessitatibus reprehenderit voluptas assumenda, 
                  voluptates sequi laudantium delectus vel earum perspiciatis accusamus. Aperiam corporis eum dolorum minima nostrum, nobis architecto.
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <div className='flex gap-3'>
              <Button variant={'outline'}>
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
              </Button>
              <Button>
                  <DialogAlert
                    action="deleteProyect"
                    id={selectedRow.id_proyecto}
                    close={close}
                  />
              </Button>
            </div>
            <Button variant={'outline'} onClick={close}>Cerrar</Button>
          </DialogFooter>
          <DialogClose
            onClick={close}
          >

          </DialogClose>
        </DialogContent>
        
      </Dialog>
    </div>
  )
}

export default DialogInfo