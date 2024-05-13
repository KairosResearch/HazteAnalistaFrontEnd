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

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


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
            <>
              <DialogHeader className='flex justify-between flex-row'>
                <DialogTitle>Proyecto: {selectedRow.nombre}</DialogTitle>

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
                  <Button variant={'outline'} onClick={close}>Cerrar</Button>
                </div>
                
              </DialogHeader>

              <Tabs defaultValue="description" >
                <TabsList>
                  <TabsTrigger value="description">Descripcion</TabsTrigger>
                  <TabsTrigger value="links">Links</TabsTrigger>
                  <TabsTrigger value="finance">Financiamiento</TabsTrigger>
                  <TabsTrigger value="analyzis">Analisis</TabsTrigger>
                  
                </TabsList>
                <TabsContent value="description">
                  <p className='text-green-400'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt sapiente necessitatibus reprehenderit voluptas assumenda, 
                    voluptates sequi laudantium delectus vel earum perspiciatis accusamus. Aperiam corporis eum dolorum minima nostrum, nobis architecto.
                  </p>
                </TabsContent>
                <TabsContent value="links">
                  <p className='text-blue-400'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt sapiente necessitatibus reprehenderit voluptas assumenda, 
                    voluptates sequi laudantium delectus vel earum perspiciatis accusamus. Aperiam corporis eum dolorum minima nostrum, nobis architecto.
                  </p>
                </TabsContent>
                <TabsContent value="finance">
                  <p className='text-slate-400'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt sapiente necessitatibus reprehenderit voluptas assumenda, 
                    voluptates sequi laudantium delectus vel earum perspiciatis accusamus. Aperiam corporis eum dolorum minima nostrum, nobis architecto.
                  </p>
                </TabsContent>
                <TabsContent value="analyzis">
                  <p className='text-orange-400'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt sapiente necessitatibus reprehenderit voluptas assumenda, 
                    voluptates sequi laudantium delectus vel earum perspiciatis accusamus. Aperiam corporis eum dolorum minima nostrum, nobis architecto.
                  </p>
                </TabsContent>
              </Tabs>
            </>

          )}

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