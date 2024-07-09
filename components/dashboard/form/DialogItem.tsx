"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDialogItem, useDialogInstructions } from "@/hooks/useDialogs";

import DashboardDataForm from "@/components/dashboard/form/DashboardDataForm";

import { DialogItemProps } from "@/index";
import { X } from "lucide-react";

const DialogItem = (props: DialogItemProps) => {
  const { isOpen, setIsOpen, mode } = useDialogItem();
  const { isOpenInstr } = useDialogInstructions();

  return (
    <Dialog open={isOpen}>
      <DialogContent className="max-h-[69vh] md:max-h-full md:min-w-[80%] overflow-auto">
        <DialogHeader className="m-0 p-0">
          {mode === "edit" && (
            <DialogTitle className="text-xl md:text-3xl">
              <span>{props.data?.proyecto} </span>
              <span className="text-sm text-gray-500">
                - {props.data?.ticker}
              </span>
            </DialogTitle>
          )}

          <div className="md:hidden ">
            <DialogTitle className="text-xl m-0">
              {mode === "add" && <span>Agregar Proyecto</span>}
            </DialogTitle>
            <DialogDescription className="m-0 p-0">
              Configura tu proyecto
            </DialogDescription>
          </div>

          {!isOpenInstr && (
            <X
              className="absolute top-2 right-2 cursor-pointer hover:text-red-500"
              onClick={() => {
                setIsOpen(false);
              }}
            ></X>
          )}
        </DialogHeader>
        {mode === "edit" ? (
          <DashboardDataForm
            catalogos={props.catalogos}
            type="update"
            data={props.data}
            close={props.close}
            projectsList={null}
          />
        ) : (
          <DashboardDataForm
            catalogos={props.catalogos}
            type="create"
            data={null}
            close={props.close}
            projectsList={props.projectsList}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DialogItem;
