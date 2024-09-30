"use client";
//Imports for the component.
//React
import React from "react";
//Ui needed
import { Button } from "@/components/ui/button";
//Hooks
import { useDialogItem } from "@/hooks/useDialogs";

const EditProjectButton = () => {
  const { setIsOpen, isOpen, setMode } = useDialogItem();
  return (
    <>
      <span
        onClick={() => {
          setMode("edit");
          setIsOpen(!isOpen);
        }}
        className="text-xs md:hidden mt-1 dark:text-green-light text-primary font-bold"
      >
        Editar
      </span>
      <Button
        variant={"outline"}
        className=" dark:text-green-light text-primary  font-bold hidden md:inline "
        onClick={() => {
          setMode("edit");
          setIsOpen(!isOpen);
        }}
      >
        Editar
      </Button>
    </>
  );
};

export default EditProjectButton;
