import React from 'react'
import {
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import Image from 'next/image';
  import { tableHeaders } from "@/utils";

const DashboardHeader = () => {
  return (
    <TableHeader className="">
        <TableRow className="divide-x-2 divide-y sticky top-[-1px] border-grey-light bg-dark-grey/95 z-50 divide-grey-light">
          {
            tableHeaders.map((header) => (
              <TableHead key={header.key} className="">
                <div className="flex gap-2 items-center justify-center">
                  <Image width={20} height={20} src={header.icon} alt={header.name} />
                  <p>{header.name}</p>
                </div>
              </TableHead>
            ))
          }
          </TableRow>
      </TableHeader>
  )
}

export default DashboardHeader