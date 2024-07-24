import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonTable = () => {
  return (
    <>
      <TableRow>
        <TableCell colSpan={2}>
          <Skeleton className="w-full h-10 rounded-sm" />
        </TableCell>
        <TableCell colSpan={10}>
          <Skeleton className="w-full h-10 rounded-sm" />
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={2}>
          <Skeleton className="w-full h-10 rounded-sm" />
        </TableCell>
        <TableCell colSpan={10}>
          <Skeleton className="w-full h-10 rounded-sm" />
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={2}>
          <Skeleton className="w-full h-10 rounded-sm" />
        </TableCell>
        <TableCell colSpan={10}>
          <Skeleton className="w-full h-10 rounded-sm" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={2}>
          <Skeleton className="w-full h-10 rounded-sm" />
        </TableCell>
        <TableCell colSpan={10}>
          <Skeleton className="w-full h-10 rounded-sm" />
        </TableCell>
      </TableRow>
    </>
  );
};

export default SkeletonTable;
