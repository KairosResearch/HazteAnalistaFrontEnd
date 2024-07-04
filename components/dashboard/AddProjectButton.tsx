"use client";
import React from "react";
import { useDialogItem } from "@/hooks/useDialogs";

const AddProjectButton = () => {
  const { setIsOpen, isOpen, setMode } = useDialogItem();

  return (
    <div
      className="hover:bg-card-foreground hover:text-card text-card-foreground rounded-lg px-4 text-sm font-bold
                border border-input bg-background hover:cursor-pointer"
      onClick={() => {
        setIsOpen(!isOpen);
        setMode("add");
      }}
    >
      <p className="p-0">
        <span className="hidden md:inline">Agregar proyecto</span>
        <span> +</span>
      </p>
    </div>
  );
};

export default AddProjectButton;
