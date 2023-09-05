"use client";
import TroubleCard from "@/components/utils/TroubleCard";

// type DataObject = {
//   owner_name: string;
//   department: string;
//   role: string;
//   created_at: string;
//   updated_at: string;
//   password: string;
// };

// type DataProps = {
//   data: DataObject[];
// };

// async function getData() {
//   const res = await fetch("http://localhost:8000/api/v1/accounts/");

//   if (!res.ok) {
//     throw new Error(res.statusText);
//   }

//   const data: DataProps = await res.json();
//   return data;
// }

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
      <div className="flex flex-col flex-wrap w-full gap-2">
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
