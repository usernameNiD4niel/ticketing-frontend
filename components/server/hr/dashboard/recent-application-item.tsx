import Link from "next/link";
import React, { FC } from "react";

interface RecentApplicationItemProps {
  name: string;
  position: string;
  date: string;
  id: string;
}

const RecentApplicationItem: FC<RecentApplicationItemProps> = ({
  date,
  name,
  position,
  id,
}) => {
  return (
    <div className="w-full flex border-s-2 cursor-pointer border-s-black border-opacity-20 justify-between px-3 py-2 hover:border-s-[#879FFF] hover:border-s-4 transition-border duration-150 hover:text-[#879FFF] ease-in">
      <div className="w-full grid grid-cols-3">
        <p className="text-sm md:text-base">{name}</p>
        <p className="text-sm md:text-base">{position}</p>
        <p className="hidden md:flex">{date}</p>
      </div>
      <Link
        href={`/hr/application/${id}`}
        className="bg-neutral-100 text-neutral-900 px-5 py-2 rounded-md hover:bg-neutral-100/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80 text-sm md:text-base w-fit"
      >
        View
      </Link>
    </div>
  );
};

export default RecentApplicationItem;
