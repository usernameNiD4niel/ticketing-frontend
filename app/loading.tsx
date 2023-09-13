import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="w-full max-w-5xl flex-col mt-44 items-center justify-center ml-20">
      <div className="space-y-3 w-full">
        <Skeleton className=" w-[400px] h-10" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[350px]" />
      </div>
      <Skeleton className="mt-5 w-full max-w-5xl rounded-lg h-12 mb-5" />
      <Skeleton className="flex flex-col items-center gap-y-2 justify-center w-full max-w-6xl my-12 px-8" />
      <Skeleton className="mt-5 w-[350px] rounded-lg h-10 mb-5" />
      <div className="flex flex-wrap gap-2 items-center">
        <Skeleton className="w-full md:max-w-[320px] h-[150px]" />
        <Skeleton className="w-full md:max-w-[320px] h-[150px]" />
        <Skeleton className="w-full md:max-w-[320px] h-[150px]" />
        <Skeleton className="w-full md:max-w-[320px] h-[150px]" />
        <Skeleton className="w-full md:max-w-[320px] h-[150px]" />
        <Skeleton className="w-full md:max-w-[320px] h-[150px]" />
        <Skeleton className="w-full md:max-w-[320px] h-[150px]" />
        <Skeleton className="w-full md:max-w-[320px] h-[150px]" />
        <Skeleton className="w-full md:max-w-[320px] h-[150px]" />
        <Skeleton className="w-full md:max-w-[320px] h-[150px]" />
        <Skeleton className="w-full md:max-w-[320px] h-[150px]" />
        <Skeleton className="w-full md:max-w-[320px] h-[150px]" />
        <Skeleton className="w-full md:max-w-[320px] h-[150px]" />
        <Skeleton className="w-full md:max-w-[320px] h-[150px]" />
        <Skeleton className="w-full md:max-w-[320px] h-[150px]" />
      </div>
    </div>
  );
};

export default Loading;
