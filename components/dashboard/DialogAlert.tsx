//Imports for the component.
//React
import React, { useState, useEffect } from "react";
//Next
import Image from "next/image";
//Hooks
import { useUserTableData } from "@/hooks/useUserData";
//values and utilities
import { DialogAlertProps } from "@/index";
import { handleDeleteProyect } from "@/actions/proyectActions";
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
//Components
import { Button } from "@/components/ui/button";
import { TableHead } from "@/components/ui/table";
import { useProjects } from "@/hooks/useProjects";

const DialogAlert = ({ prToDelete, clean }: DialogAlertProps) => {
  //to modify the global state
  const { setUserTableData } = useUserTableData();
  const [guzma, setGuzma] = useState<number | null>(null);
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.localStorage.getItem("guzma") !== null
    ) {
      setGuzma(Number(window.localStorage.getItem("guzma")));
    }
  }, []);
  const [count, setCount] = React.useState(0);
  const { mutate } = useProjects(guzma ?? 0);
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
      console.log(prToDelete);

      const deleted = await handleDeleteProyect(guzma, prToDelete);
      console.log(deleted);
      if (deleted.error) {
        alert("Error al eliminar el proyecto");
      } else {
        // setCount(count + 1);
        // console.log(count);
        // setUserTableData(["Cambio" + count]);
        mutate();
        clean();
      }
    }
  };
  return (
    <>
      <AlertDialog>
        <TableHead className="sticky left-[-2px] top-0 border-x-2  z-20">
          {prToDelete.length > 0 && (
            <AlertDialogTrigger className="h-6 w-6">
              <Image
                width={50}
                height={50}
                src={"/icons/table/basurero.png"}
                alt={"Eliminar proyectos"}
              />
            </AlertDialogTrigger>
          )}
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
            <AlertDialogCancel onClick={() => clean()}>
              Cancelar
            </AlertDialogCancel>
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
