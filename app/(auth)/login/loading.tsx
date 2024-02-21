import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="w-full h-screen flex">

      <div className="h-screen w-[30%] flex items-center justify-center flex-col mx-8">

        <Skeleton className="h-[90px] w-[140px]" />

        <div className="mt-10 w-full space-y-2">
          <Skeleton className="h-[30px] w-[47%]" />
          <Skeleton className="h-[16px] w-[50%]" />
        </div>

        <Skeleton className="h-[36px] w-full mt-8" />
        <Skeleton className="h-[36px] w-full mt-5" />

        <div className="w-full flex justify-end">
          <Skeleton className="h-[18px] w-[20%] mt-16" />
        </div>

        <Skeleton className="h-[36px] w-full mt-8" />

        <div className="w-full flex items-center justify-center">
          <Skeleton className="h-[16px] w-[60%] mt-8" />
        </div>

      </div>

      <div className="w-[70%] h-screen flex items-center justify-center">
        <Skeleton className="h-[60vh] p-4 w-[70%] hidden md:flex" />
      </div>

    </div>
  );
};

export default Loading;
