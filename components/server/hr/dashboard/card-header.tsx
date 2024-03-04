import { getApplicationStatusCount } from "@/endpoints";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

interface CardHeaderProps {
  count: number;
  tag: string;
  url_button: string;
}

const CardHeader = async () => {
  const token = cookies().get("token")?.value;

  const { for_interview, hire_cancel, sourcing } =
    await getApplicationStatusCount(token!);

  return (
    <>
      <Card
        count={sourcing}
        tag="Sourcing Position"
        url_button="/hr/feed?status=sourcing"
        key={"SourcingPositionKey"}
      />
      <Card
        count={for_interview}
        tag="For Interview"
        url_button="/hr/feed?status=for-interview"
        key={"ForInterviewKey"}
      />
      <Card
        count={hire_cancel}
        tag="Hire Cancel"
        url_button="/hr/feed?status=hire-cancel"
        key={"HireCancelKey"}
      />
    </>
  );
};

function Card({ count, tag, url_button }: CardHeaderProps) {
  return (
    <div className="rounded-lg py-6 px-7 transition-background duration-200 ease-in hover:cursor-pointer hover:text-white hover:bg-[#879FFF] flex flex-col gap-3 bg-white w-full">
      <div>
        <h3 className="text-3xl font-bold">{count}</h3>
        <p className="font-bold text-lg">{tag}</p>
      </div>
      <div className="flex w-full justify-end md:justify-normal">
        <Link href={url_button} className="underline underline-offset-1">
          See updates
        </Link>
      </div>
    </div>
  );
}

export default CardHeader;
