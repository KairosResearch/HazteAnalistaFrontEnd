//Imports for the component.
//React
import React from "react";
//components
import DialogAlert from "./DialogAlert";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
//Next
import Image from "next/image";
//Values and utilities
import { tableHeaders } from "@/utils";

type DashboardHeaderProps = {
  prToDelete: number[];
  clean: () => void;
};

const DashboardHeader = ({ prToDelete, clean }: DashboardHeaderProps) => {
  return (
    <TableHeader className="">
      <TableRow
        className="divide-x-2 divide-y sticky top-[-1px] border-t-2 border-primary dark:border-grey-light bg-primary text-primary-foreground
      
      dark:bg-dark-grey/95 z-[15] divide-primary dark:divide-grey-light"
      >
        <DialogAlert prToDelete={prToDelete} clean={clean} />
        {tableHeaders.map((header) => (
          <TableHead key={header.key} className="">
            <div className="flex gap-2 items-center justify-center">
              <Image
                width={20}
                height={20}
                src={header.icon}
                alt={header.name}
              />
              <p>{header.name}</p>
            </div>
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};

export default DashboardHeader;
