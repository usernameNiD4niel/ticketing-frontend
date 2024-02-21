import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="w-full h-screen flex">

      <div className="w-[70%] h-screen flex items-center justify-center">
        <Skeleton className="h-[60vh] p-4 w-[70%] hidden md:flex" />
      </div>

      <div className="h-screen w-[30%] flex items-center justify-center flex-col mx-5">

        <Skeleton className="h-[90px] w-[140px]" />

        <div className="mt-10 w-full">
          <Skeleton className="h-[30px] w-[47%]" />
          <Skeleton className="h-[16px] w-[80%]" />
        </div>

        <Skeleton className="h-[36px] w-full mt-8" />
        <Skeleton className="h-[36px] w-full mt-5" />
        <Skeleton className="h-[36px] w-full mt-5" />
        <Skeleton className="h-[36px] w-full mt-5" />
        <Skeleton className="h-[36px] w-full mt-5" />

        <Skeleton className="h-[36px] w-full mt-16" />

        <div className="w-full flex items-center justify-center">
          <Skeleton className="h-[14px] w-[45%] mt-6" />
        </div>

      </div>

    </div>
  );
};

export default Loading;
