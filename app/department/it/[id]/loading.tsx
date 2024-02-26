import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center space-x-4 w-full flex-col px-16 py-6">
      {/* Ticket Details */}
      <div className="w-full flex justify-between items-start flex-row">
        {/* Left --- DETAILS */}
        <div className="space-y-2">
          <Skeleton className="h-[36px] w-[110px]" />
          <Skeleton className="h-4 w-[70px] rounded-full" />
          <div className="mt-5 space-y-2">
            <Skeleton className="h-4 w-[210px]" />
            <Skeleton className="h-4 w-[220px]" />
            <Skeleton className="h-4 w-[220px]" />
            <Skeleton className="h-4 w-[220px]" />
            <Skeleton className="h-4 w-[220px]" />
          </div>
        </div>
        {/* Right --- DATES */}
        <div className="flex justify-end flex-col gap-2">
          <Skeleton className="h-4 w-[220px]" />
          <Skeleton className="h-4 w-[220px]" />
          <Skeleton className="h-4 w-[220px]" />
          <Skeleton className="h-4 w-[220px]" />
        </div>
      </div>

      {/* Update button ticket */}
      <div className="w-full flex justify-end">
        <Skeleton className="h-[60px] w-[190px] rounded-full" />
      </div>

      {/* Comments upper label */}
      <div className="w-full">
        <div className="space-y-2 my-4">
          <Skeleton className="h-10 w-[90px]" />
          <Skeleton className="h-4 w-[400px]" />
        </div>

        {/* Comments */}
        <Skeleton className="h-[100px] w-full" />
        <div className="w-full flex items-center justify-end mt-2">
          <Skeleton className="h-[50px] w-[160px]" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
