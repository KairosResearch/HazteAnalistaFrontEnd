"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDialogItem } from "@/hooks/useDialogs";

import DashboardDataForm from "./DashboardDataForm";

import { DialogItemProps } from "@/index";
import { X } from "lucide-react";

const DialogItem = (props: DialogItemProps) => {
  const { isOpen, setIsOpen, mode } = useDialogItem();

  return (
    <Dialog open={isOpen}>

      <DialogContent className="max-h-[50vh] md:max-h-full md:min-w-[80%] overflow-auto">
        <DialogHeader >

            {
              mode === "edit" && (
                <DialogTitle className="text-xl md:text-3xl">
                  <span>{props.data?.proyecto} {" "}</span>
                  <span className="text-sm text-gray-500">
                     - {props.data?.ticker}
                  </span>
                </DialogTitle>
              )

            }
              
            <div className="md:hidden">
            <DialogTitle className="text-xl">
              {mode === "add" && (
                <span>Agregar Proyecto</span>
              )}
          </DialogTitle>
          <DialogDescription>Configura tu proyecto</DialogDescription>
            

            </div>

              
                <X 
                    className='absolute top-2 right-2 cursor-pointer hover:text-red-500'
                    onClick={() => {setIsOpen(false)}}
                >

                </X>
              
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
