"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { FC } from "react";
import { BsChevronRight } from "react-icons/bs";

type BreadCrumbsProps = {
  tabRole: string;
  id: string;
};

const BreadCrumbs: FC<BreadCrumbsProps> = ({ tabRole, id }) => {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tabName");
  return (
    <ul className="flex gap-x-2 items-center text-xs">
      <li>
        <Link href={currentTab === "Feed" ? "/department/it" : tabRole}>
          {currentTab}
        </Link>
      </li>
      <li>
        <BsChevronRight />
      </li>
      <li>
        <Link href={`/department/it/${id}?tabName=${currentTab}`}>
          Ticket {id}
        </Link>
      </li>
    </ul>
  );
};

export default BreadCrumbs;
