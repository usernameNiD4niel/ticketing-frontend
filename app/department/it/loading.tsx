import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
    return (
        <div className="w-full flex items-center h-[90vh] justify-center">

            <div className="space-y-3 w-[90%] h-full flex items-center justify-center flex-col mx-6">

                <div className="flex justify-between items-center w-full">

                    {/* Search and Filter */}
                    <div className="flex gap-2 items-center">
                        <Skeleton className=" w-[220px] h-[55px]" />
                        <Skeleton className=" w-[45px] h-[55px]" />
                    </div>

                    {/* Export */}
                    <Skeleton className=" w-[230px] h-[55px]" />

                </div>

                {/* Table */}
                <Skeleton className="h-[60vh] w-full" />
            </div>

        </div>
    );
};

export default Loading;
