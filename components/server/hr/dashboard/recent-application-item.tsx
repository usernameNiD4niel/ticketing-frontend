import { Button } from "@/components/ui/button";
import React, { FC } from "react";

interface RecentApplicationItemProps {
  name: string;
  position: string;
  date: string;
}

const RecentApplicationItem: FC<RecentApplicationItemProps> = ({
  date,
  name,
  position,
}) => {
  return (
    <div className="w-full flex items-center border-s-2 border-s-black border-opacity-20 justify-between px-3 py-2 hover:border-s-[#879FFF] hover:border-s-4 transition-border duration-150 hover:text-[#879FFF] ease-in">
      <p className="text-sm md:text-base">{name}</p>
      <p className="text-sm md:text-base">{position}</p>
      <p className="hidden md:flex">{date}</p>
      <Button variant={"secondary"} className="text-sm md:text-base">
        View
      </Button>
    </div>
  );
};

export default RecentApplicationItem;
