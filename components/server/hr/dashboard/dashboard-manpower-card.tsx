import { Button } from "@/components/ui/button";
import React, { FC } from "react";

interface DashboardManpowerCardProps {
  department: string;
  message: string;
  date: string;
  id: string;
}

const DashboardManpowerCard: FC<DashboardManpowerCardProps> = ({
  date,
  department,
  id,
  message,
}) => {
  return (
    <div className="rounded-lg p-4 flex flex-col gap-3 bg-white dark:bg-[#2C2C2C] w-full xl:w-full lg:w-[45%] space-y-2">
      <div className=" px-4 py-2 bg-[#EFF3F4] dark:bg-[#EFF3F4]/10 rounded-full w-fit text-xs font-light">
        {department}
      </div>
      <p className="font-bold text-sm md:text-base">{message}</p>
      <p className="md:text-sm text-xs">{date}</p>
      <Button variant={"secondary"} className="text-sm font-light">
        Read More
      </Button>
    </div>
  );
};

export default DashboardManpowerCard;
