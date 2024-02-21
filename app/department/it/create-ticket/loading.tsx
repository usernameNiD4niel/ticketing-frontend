import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return <div className="w-full h-screen flex items-center justify-center">
    <div className="w-[55%]">
      {/* Header */}
      <Skeleton className="w-[40%] h-[36px]" />

      <div className="my-2 space-y-2">
        <div className="space-y-4">
          <Skeleton className="w-[40px] h-[16px]" />
          <Skeleton className="w-full h-[36px]" />
        </div>

        <div className="space-y-4">
          <Skeleton className="w-[40px] h-[16px]" />
          <Skeleton className="w-full h-[36px]" />
        </div>

        <div className="space-y-4">
          <Skeleton className="w-[40px] h-[16px]" />
          <Skeleton className="w-full h-[36px]" />
        </div>

        <div className="space-y-4">
          <Skeleton className="w-[40px] h-[16px]" />
          <Skeleton className="w-full h-[36px]" />
        </div>

        <div className="space-y-4">
          <Skeleton className="w-[40px] h-[16px]" />
          <Skeleton className="w-full h-[190px]" />
        </div>

        <div className="space-y-4">
          <Skeleton className="w-[40px] h-[16px]" />
          <Skeleton className="w-full h-[36px]" />
        </div>

        <div className="space-y-4">
          <Skeleton className="w-[40px] h-[16px]" />
          <Skeleton className="w-full h-[36px]" />
        </div>

      </div>

      {/* Buttons */}
      <div className="w-full flex items-center gap-2 justify-end">
        <Skeleton className="w-[120px] h-[36px]" />
        <Skeleton className="w-[120px] h-[36px]" />
      </div>
    </div>
  </div>;
};

export default Loading;
