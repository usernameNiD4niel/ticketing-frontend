import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
    return <div className="w-full flex items-center justify-center">
        <div className="w-[60%]">
            {/* Header */}
            <div className="w-full flex justify-between items-center my-2">
                <Skeleton className="w-[150px] h-[36px]" />
                <Skeleton className="w-[60px] h-[60px] rounded" />
            </div>

            {/* Notification */}
            <div className="w-full space-y-2">
                <Skeleton className="w-full h-[60px] rounded" />
                <Skeleton className="w-full h-[60px] rounded" />
                <Skeleton className="w-full h-[60px] rounded" />
                <Skeleton className="w-full h-[60px] rounded" />
                <Skeleton className="w-full h-[60px] rounded" />
                <Skeleton className="w-full h-[60px] rounded" />
                <Skeleton className="w-full h-[60px] rounded" />
            </div>


        </div>
    </div>;
};

export default Loading;
