import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
    return (
        <div className="w-full overflow-x-hidden flex items-center">

            {/* Side nav */}
            <Skeleton className="w-[25%] h-screen" />

            <div className="space-y-3 w-[75%] h-screen flex items-center justify-center flex-col mx-6">

                <div className="w-full flex justify-between items-center w-[69%]">

                    {/* Search and Filter */}
                    <div className="flex gap-2 items-center">
                        <Skeleton className=" w-[220px] h-[55px]" />
                        <Skeleton className=" w-[45px] h-[55px]" />
                    </div>

                    {/* Export */}
                    <Skeleton className=" w-[230px] h-[55px]" />

                </div>

                {/* Table */}
                <Skeleton className="h-[60vh] w-[70%]" />
            </div>

        </div>
    );
};

export default Loading;
