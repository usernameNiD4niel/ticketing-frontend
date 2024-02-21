import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="w-full h-screen flex">

      <div className="h-screen w-[30%] flex items-center justify-center">

        <Skeleton className="h-[90px] w-[140px]" />

        <div className="mt-10 w-full">
          <Skeleton className="h-[30px] w-[47%]" />
          <Skeleton className="h-[16px] w-[50%]" />
        </div>

        <Skeleton className="h-[16px] w-full mt-8" />
        <Skeleton className="h-[16px] w-full mt-5" />

        <Skeleton className="h-[16px] w-full mt-16" />

        <div className="w-full flex items-center justify-center">
          <Skeleton className="h-[10px] w-[45%] mt-10" />
        </div>

      </div>

      <Skeleton className="h-screen p-4 w-[70%] hidden md:flex" />

    </div>
  );
};

export default Loading;
