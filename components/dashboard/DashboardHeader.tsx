import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { tableHeaders } from "@/utils";
import DialogAlert from "./DialogAlert";

type DashboardHeaderProps = {
  prToDelete: number[];
  clean: () => void;
};

const DashboardHeader = ({ prToDelete, clean }: DashboardHeaderProps) => {
  return (
    <TableHeader className="">
      <TableRow className="divide-x-2 divide-y sticky top-[-1px] border-t-2 border-grey-light bg-dark-grey/95 z-[15] divide-grey-light">
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