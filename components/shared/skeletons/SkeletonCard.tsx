import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCard = () => {
  return (
    <div className="flex flex-col space-y-3 min-w-64 ">
      <Skeleton className="h-[20vh] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 " />
        <Skeleton className="h-4 " />
      </div>
    </div>
  );
};

export default SkeletonCard;
