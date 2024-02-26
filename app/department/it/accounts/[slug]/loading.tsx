import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
    return <div className="w-full flex items-center justify-center">
        <div className="w-[60%]">
            {/* Header */}
            <div className="w-full flex justify-center items-center my-10 gap-2">
                <Skeleton className="w-[160px] h-[160px] rounded-full" />
                <Skeleton className="w-[60px] h-8 rounded-full" />
                <Skeleton className="w-[80px] h-12 rounded-none" />
                <Skeleton className="w-[60px] h-8 rounded-none" />
                <div>
                    <Skeleton className="w-[120px] h-4 rounded-none" />
                    <Skeleton className="w-[100px] h-4 rounded-none" />
                </div>
            </div>

            {/* Update Password Tab */}
            <div className="w-full my-2">
                <Skeleton className="w-[100px] h-[60px] rounded-none" />
                <Skeleton className="w-full h-[1px] rounded-none" />
            </div>

            {/* Update Password Form */}
            <div className="w-full space-y-4 my-2">
                <Skeleton className="w-[140px] h-[50px] rounded-none" />
                <div className="space-y-2">
                    <div className="space-y-1">
                        <Skeleton className="w-[110px] h-4 rounded-none" />
                        <Skeleton className="w-full h-12 rounded" />
                    </div>
                    <div className="space-y-1">
                        <Skeleton className="w-[110px] h-4 rounded-none" />
                        <Skeleton className="w-full h-12 rounded" />
                    </div>
                    <div className="space-y-1">
                        <Skeleton className="w-[110px] h-4 rounded-none" />
                        <Skeleton className="w-full h-12 rounded" />
                    </div>
                </div>
            </div>

            <div className="w-full flex justify-end mt-2">
                <Skeleton className="w-[120px] h-12 rounded" />
            </div>

        </div>
    </div>;
};

export default Loading;
