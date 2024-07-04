import React from "react";
import Image from "next/image";
import { iconsFormLeftSide as icons } from "@/utils/index";
import { FormLabel } from "@/components/ui/form";
import { useDialogInstructions } from "@/hooks/useDialogs";

interface FormNumbersProps {
  values: any;
  title: string;
  image: string;
}

const FormNumbers = ({ values, title, image }: FormNumbersProps) => {
  const { isOpenInstr } = useDialogInstructions();
  const icon = icons.find((icon) => icon.name === image);
  const a = icon ? icon : { icon: "", alt: "" };

  return (
    <div className="flex flex-col">
      <FormLabel className="flex items-center text-sm">
        <Image
          className="inline-block pr-1"
          src={a.icon}
          alt={a.alt}
          width={20}
          height={20}
        />{" "}
        {title}:
      </FormLabel>
      <div className="pl-5">
        <span className={`${isOpenInstr ? "" : "text-gray-500"}`}>
          {values}
        </span>
      </div>
    </div>
  );
};

export default FormNumbers;
