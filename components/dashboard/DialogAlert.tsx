"use client";
import React from "react";
//types:
import { DialogAlertProps } from "@/index";

//Hooks:
import { useUserTableData } from "@/hooks/useUserData";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { handleDeleteProyect } from "@/actions/proyectActions";
import { TableHead } from "@/components/ui/table";
import Image from "next/image";

const DialogAlert = ({prToDelete, clean}: DialogAlertProps) => {
  //to modify the global state
  const { setUserTableData } = useUserTableData();

  const [count, setCount] = React.useState(0);
  // const [isOpen, setIsOpen] = React.useState(false);
  // const [error, setError] = React.useState("");
  // const [loading, setLoading] = React.useState(false);

  const onDeleteProject = async () => {
    if (
      typeof window !== undefined &&
      window.localStorage.getItem("guzma") !== null
    ) {
      const guzma = Number(window.localStorage.getItem("guzma"));
        console.log("guzma", guzma);
      console.log(prToDelete)

      const deleted = await handleDeleteProyect(guzma, prToDelete);
      console.log(deleted);
      if (deleted.error) {
        alert("Error al eliminar el proyecto");
      } else {
        setCount(count + 1);
        console.log(count);
        setUserTableData(["Cambio" + count]);
        clean();
       
      }
    }
  };
  return (
    <>
      
        <AlertDialog>
          <TableHead>

            {
              prToDelete.length > 0 && (
                <AlertDialogTrigger className="h-7 w-7">
          
            
          <Image
            width={70}
            height={70}
            src={'/icons/table/Basurero.png'}
            alt={'Eliminar proyectos'}
          />
          
       
      
      </AlertDialogTrigger>
              )
            }
          
          </TableHead>
          
          <AlertDialogContent className="w-96">
            <AlertDialogHeader>
              <AlertDialogTitle>
                ¿Seguro que quieres eliminar {prToDelete.length} proyecto{"(s)"}?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Será{"(n)"} eliminado{"(s)"} de tu Dashboard de seguimiento
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="my-3">
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction>
                <Button
                  variant="destructive"
                  onClick={onDeleteProject}
                  className="w-full"
                >
                  Sí, eliminar
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
     
      
    </>
  );
};

export default DialogAlert;
