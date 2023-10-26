import Link from "next/link";
import React, { FC } from "react";

interface CardHeaderProps {
  count: number;
  tag: string;
  url_button: string;
}

const CardHeader: FC<CardHeaderProps> = ({ count, tag, url_button }) => {
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
};

export default CardHeader;
