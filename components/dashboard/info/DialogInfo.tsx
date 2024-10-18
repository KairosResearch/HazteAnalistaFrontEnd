//Imports for the component.
//React
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
//Components
import EditProjectButton from "@/components/dashboard/EditProjectButton";
import DialogItem from "@/components/dashboard/form/DialogItem";
import InfoTabs from "./InfoTabs";
//Values and utilities
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogInfoProps, InfoTabsProps, ProyectsInfo } from "@/index";

//Services API
import { getProyectById } from "@/services/backend/proyectsInfo";

const DialogInfo = ({
  isDialogOpen,
  close,
  selectedRow,
  catalogos,
  projectsList,
}: DialogInfoProps) => {
  const id = projectsList?.find(
    (item) => item.proyecto === selectedRow?.proyecto ?? 0,
  );

  const [info, setInfo] = useState<ProyectsInfo | null>(null);
  useEffect(() => {
    const getInfo = async () => {
      const info: ProyectsInfo = await getProyectById(id?.id ?? 0);

      setInfo(info);
    };
    getInfo();
  }, [id]);

  return (
    <Dialog open={isDialogOpen}>
      <DialogContent className="px-3 xl:px-16 xl:py-5 max-h-[50vh] md:max-h-full md:min-w-[80%] overflow-auto">
        {selectedRow && (
          <>
            <DialogHeader className="flex justify-between md:items-center flex-col md:flex-row md:mr-5">
              <DialogTitle className="text-left md:text-center text-xl md:text-2xl xl:text-4xl font-bold">
                Proyecto: {selectedRow.proyecto} | {info?.ticker}
              </DialogTitle>

              <div className="flex gap-3 items-center">
                <EditProjectButton />

                <DialogItem
                  projectsList={null}
                  mode="edit"
                  catalogos={catalogos}
                  data={{
                    ...selectedRow,
                    id4e: selectedRow.id4e?.toString(),
                    id_decision_proyecto:
                      selectedRow.id_decision_proyecto?.toString(),
                    idExchange: selectedRow.idExchange?.toString(),
                    precioEntrada: selectedRow.precioEntrada?.toString(),
                  }}
                  close={null}
                />
              </div>
              <X
                className="absolute top-2 right-2 cursor-pointer hover:text-red-500"
                onClick={close}
              ></X>
            </DialogHeader>

            {info != null && (
              <InfoTabs
                info={info}
                tieneAnalisisCualitativo={selectedRow.tieneAnalisisCualitativo}
                tieneAnalisisCuantitavivo={
                  selectedRow.tieneAnalisisCuantitavivo
                }
                id_analisis_cualitativo={selectedRow.id_analisis_cualitativo}
                id_analisis_cuantitativo={selectedRow.id_analisis_cuantitativo}
                nota={selectedRow.nota}
              />
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DialogInfo;
