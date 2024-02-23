import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center space-x-4 w-full flex-col mx-16 my-6">
      <div className="w-full flex flex-between items-center">
        <div className="space-y-3">
          <Skeleton className="h-12 w-[90px] rounded-full" />
          <Skeleton className="h-12 w-[90px] rounded-full" />
          <Skeleton className="h-10 w-[120px] rounded-full" />
          <Skeleton className="h-10 w-[140px] rounded-full" />
          <Skeleton className="h-10 w-[140px] rounded-full" />
          <Skeleton className="h-10 w-[140px] rounded-full" />
          <Skeleton className="h-10 w-[140px] rounded-full" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-10 w-[90px] rounded-full" />
          <Skeleton className="h-10 w-[90px] rounded-full" />
          <Skeleton className="h-10 w-[90px] rounded-full" />
          <Skeleton className="h-10 w-[90px] rounded-full" />
        </div>
      </div>

      <div className="w-full flex justify-end my-2">
        <Skeleton className="h-[60px] w-[190px] rounded-full" />
      </div>

      <div className="w-full">
        <div className="space-y-2 my-4">
          <Skeleton className="h-12 w-[350px]" />
          <Skeleton className="h-4 w-[400px]" />
        </div>
        <Skeleton className="h-2 w-full" />
        <div className="my-3">
          <Skeleton className="h-8 w-[30px]" />
          <Skeleton className="h-4 w-[130px]" />
          <Skeleton className="h-8 w-full my-6" />
        </div>
        <div className="my-6">
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-2 w-[60px]" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
