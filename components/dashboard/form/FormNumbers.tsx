//Imports for the component.
//React
import React from "react";
//Next
import Image from "next/image";
//Values and utilities
import { iconsFormLeftSide as icons } from "@/utils/index";
//Components
import { FormLabel } from "@/components/ui/form";
//Hooks
import { useDialogInstructions } from "@/hooks/useDialogs";

interface FormNumbersProps {
  values: any;
  title: string;
  image: string;
}

const FormNumbers = ({ values, title, image }: FormNumbersProps) => {
  const { isOpenInstr } = useDialogInstructions();
  const iconsFiltered = icons.filter((icon) => icon.name === image);

  return (
    <div className="flex flex-col">
      <FormLabel className="flex items-center text-sm">
        {
          iconsFiltered.map((a, index) => (
            <Image
              key={index}
              className={`inline-block pr-1 ${a.clasName}`} 
              src={a.icon}
              alt={a.alt}
              width={20}
              height={20}
            />
          ))
        }
        
        {title}:
      </FormLabel>
      <div>
        {title === "Market Cap" && (
          <p className="m-0 text-primary-foreground/90 text-xs">
            Capitalización de mercado del proyecto
          </p>
        )}
        {title === "Rendimiento" && (
          <p className="m-0 text-primary-foreground/90 text-xs">
            Rendimiento con relación a tu precio de entrada
          </p>
        )}
      </div>
      <div className="pl-5">
        <span className={`${isOpenInstr ? "" : "text-gray-500"}`}>
          {values}
        </span>
      </div>
    </div>
  );
};

export default FormNumbers;
