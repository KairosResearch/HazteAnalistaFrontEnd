import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonListItem = () => {
  return (
    <div className="">
      <div className="flex flex-row justify-between items-center mb-3">
        <Skeleton className="h-8 w-full rounded-sm" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-12 w-1/4" />
        <Skeleton className="h-12 w-5/12 " />
      </div>
    </div>
  );
};

export default SkeletonListItem;
