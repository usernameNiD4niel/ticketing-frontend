"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { FC, useEffect } from "react";
import { BsChevronRight } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { updateNotificationAction } from "@/app/actions";

type BreadCrumbsProps = {
  tabRole: string;
  id: string;
};

const BreadCrumbs: FC<BreadCrumbsProps> = ({ tabRole, id }) => {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tabName");
  const id_ = searchParams.get("id");
  const isSeen = searchParams.get("isSeen");

  const router = useRouter();

  const handleNavigation = () => {
    router.back();
  };

  async function updateNotificationSeen() {
    if (isSeen === "false" && id_) {
      console.log(`isSeen ${isSeen}`);
      console.log(`id ${id_}`);
      await updateNotificationAction(id_);
      // const token = Cookies.get("token");
      // await updateNotification(token!, id_!);
    }
  }

  useEffect(() => {
    updateNotificationSeen();
  }, []);

  if (currentTab?.toLowerCase() === "create ticket") {
    return null;
  }

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
