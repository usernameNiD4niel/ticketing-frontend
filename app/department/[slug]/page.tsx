import TroubleCard from "@/components/utils/TroubleCard";

const Page = ({ params }: { params: { slug: string } }) => {
  const transformString = (input: string): string => {
    const words = input.split("-");
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(" ");
  };

  return (
    <section className="p-2 w-full flex justify-center flex-col gap-y-2">
      <h2>The URL end is: {transformString(params.slug)}</h2>
      <div className="flex flex-wrap w-full gap-2">
        <TroubleCard
          classColor="bg-[#FBFCC3] dark:bg-[#5E5F48]"
          description="Mouse not working"
          postedDate="9/1/2023"
          status="RESOLVE"
          title="#1001"
        />
        <TroubleCard
          classColor="bg-[#FCC3C3] dark:bg-[#594545]"
          description="Mouse not working"
          postedDate="9/1/2023"
          status="RESOLVE"
          title="#1001"
        />
        <TroubleCard
          classColor="bg-[#FBFCC3] dark:bg-[#5E5F48]"
          description="Mouse not working"
          postedDate="9/1/2023"
          status="CLOSED"
          title="#1001"
        />
        <TroubleCard
          classColor="bg-[#C3F2FC] dark:bg-[#485A5E]"
          description="Mouse not working"
          postedDate="9/1/2023"
          status="OPEN"
          title="#1001"
        />
        <TroubleCard
          classColor="bg-[#FCC3C3] dark:bg-[#594545]"
          description="Mouse not working"
          postedDate="9/1/2023"
          status="RESOLVED"
          title="#1001"
        />
        <TroubleCard
          classColor="bg-[#FBFCC3] dark:bg-[#5E5F48]"
          description="Mouse not working"
          postedDate="9/1/2023"
          status="RESOLVE"
          title="#1001"
        />
        <TroubleCard
          classColor="bg-[#FCC3C3] dark:bg-[#594545]"
          description="Mouse not working"
          postedDate="9/1/2023"
          status="RESOLVE"
          title="#1001"
        />
        <TroubleCard
          classColor="bg-[#FBFCC3] dark:bg-[#5E5F48]"
          description="Mouse not working"
          postedDate="9/1/2023"
          status="CLOSED"
          title="#1001"
        />
        <TroubleCard
          classColor="bg-[#C3F2FC] dark:bg-[#485A5E]"
          description="Mouse not working"
          postedDate="9/1/2023"
          status="OPEN"
          title="#1001"
        />
        <TroubleCard
          classColor="bg-[#FCC3C3] dark:bg-[#594545]"
          description="Mouse not working"
          postedDate="9/1/2023"
          status="RESOLVED"
          title="#1001"
        />
      </div>
    </section>
  );
};

export default Page;
