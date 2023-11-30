"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { FC } from "react";
import { BsChevronRight } from "react-icons/bs";
import { Button } from "@/components/ui/button";

type BreadCrumbsProps = {
  tabRole: string;
  id: string;
};

const BreadCrumbs: FC<BreadCrumbsProps> = ({ tabRole, id }) => {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tabName");

  const router = useRouter();

  const handleNavigation = () => {
    router.back();
  };

  return (
    <ul className="flex gap-x-2 items-center text-xs">
      <li>
        <Button variant={"link"} onClick={handleNavigation}>
          {currentTab}
        </Button>
        {/* <Link href={currentTab === "Feed" ? "/department/it" : tabRole}>
          {currentTab}
        </Link> */}
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
