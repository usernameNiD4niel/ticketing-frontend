import { getRecentManpower } from "@/endpoints";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

interface DashboardManpowerCardProps {
  department: string;
  message: string;
  date: string;
  id: string;
}

const DashboardManpowerCard = async () => {
  const token = cookies().get("token")?.value;

  const manpower = await getRecentManpower(token!);

  return manpower && manpower.length > 0 ? (
    manpower.map((requested) => (
      <Card
        date={requested.created_at}
        department={requested.department}
        message={`${requested.requisitioner} requested ${requested.no_employees_required} for their department`}
        id={requested.id}
        key={requested.id}
      />
    ))
  ) : (
    <div className="rounded-lg p-4 flex flex-col gap-3 bg-white w-full xl:w-full lg:w-[45%] space-y-2 items-center justify-center">
      <p className="text-sm">No recently manpower requested</p>
    </div>
  );
};

function Card({ date, department, message, id }: DashboardManpowerCardProps) {
  return (
    <div className="rounded-lg p-4 flex flex-col gap-3 bg-white w-full xl:w-full lg:w-[45%] space-y-2">
      <div className="text-primary px-4 py-2 bg-[#EFF3F4] rounded-full w-fit text-xs font-light">
        {department}
      </div>
      <p className="font-bold text-sm md:text-base">{message}</p>
      <p className="md:text-sm text-xs">{date}</p>
      <Link
        href={`/hr/requested-manpower/${id}`}
        className="bg-neutral-100 text-neutral-900 text-center py-3 hover:bg-neutral-100/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80 w-full text-sm font-light"
      >
        Read More
      </Link>
    </div>
  );
}

export default DashboardManpowerCard;
