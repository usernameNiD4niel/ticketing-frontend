import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return <div className="w-full flex items-center justify-center px-20 py-12">
    <div className="w-[55%]">
      {/* Header */}
      <Skeleton className="w-[40%] h-[36px]" />

      <div className="my-4 space-y-3 w-full">
        <div className="space-y-1">
          <Skeleton className="w-[120px] h-[16px]" />
          <Skeleton className="w-full h-[46px]" />
        </div>

        <div className="space-y-1">
          <Skeleton className="w-[120px] h-[16px]" />
          <Skeleton className="w-full h-[46px]" />
        </div>

        <div className="space-y-1">
          <Skeleton className="w-[120px] h-[16px]" />
          <Skeleton className="w-full h-[46px]" />
        </div>

        <div className="space-y-1">
          <Skeleton className="w-[120px] h-[16px]" />
          <Skeleton className="w-full h-[46px]" />
        </div>

        <div className="space-y-1">
          <Skeleton className="w-[120px] h-[16px]" />
          <Skeleton className="w-full h-[190px]" />
        </div>

        <div className="space-y-1">
          <Skeleton className="w-[120px] h-[16px]" />
          <Skeleton className="w-full h-[46px]" />
        </div>

        <div className="space-y-1">
          <Skeleton className="w-[120px] h-[16px]" />
          <Skeleton className="w-full h-[46px]" />
        </div>

      </div>

      {/* Buttons */}
      <div className="w-full flex items-center gap-2 justify-end mt-2">
        <Skeleton className="w-[120px] h-[46px]" />
        <Skeleton className="w-[120px] h-[46px]" />
      </div>
    </div>
  </div>;
};

export default Loading;
