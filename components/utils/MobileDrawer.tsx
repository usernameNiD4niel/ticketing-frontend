"use client";
import React, { FC, useEffect } from "react";
import { Button } from "../ui/button";
import { MdAccountBox } from "react-icons/md";
import { BsBoxArrowInLeft, BsTicketFill } from "react-icons/bs";
import { IoIosCreate } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { cn } from "@/lib/utils";
import Link from "next/link";
import useNavigationStore from "@/hooks/states/useNavigationStore";
import { AvailableTabs } from "@/constants/enums";

type MobileDrawerProps = {
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileDrawer: FC<MobileDrawerProps> = ({
  isDrawerOpen,
  setIsDrawerOpen,
}) => {
  const handleDrawerOpen = () => {
    setIsDrawerOpen((prevState) => !prevState);
  };

  const [activeTab] = useNavigationStore((state) => [state.activeTab]);

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 bottom-0 bg-[#EEF7FF] dark:bg-[#1a1919] z-10 px-3 drop-shadow-xl hidden md:flex gap-y-6 flex-col items-center",
        isDrawerOpen ? "w-[350px] justify-normal" : "w-20 justify-center"
      )}
    >
      <h1 className={cn("font-bold text-4xl my-24", !isDrawerOpen && "hidden")}>
        <span className="text-[#0B64B9]">OP</span>
        <span className="text-[#99CC68]">PA</span>
      </h1>
      <div className="flex flex-col w-full gap-y-3">
        <Link
          className={cn(
            "w-full text-xl flex py-3 px-6 space-x-2 text-[#0B64B9]",
            activeTab === AvailableTabs.Feed &&
              "border-s-4 border-s-[#0B64B9] bg-white dark:bg-zinc-900 font-bold"
          )}
          href="/department/it"
        >
          <span>
            <FaHome />
          </span>
          {isDrawerOpen && <span className="text-sm">Feed</span>}
        </Link>
        <Link
          className={cn(
            "w-full text-xl flex py-3 px-6 space-x-2 text-[#0B64B9]",
            activeTab === AvailableTabs["Create Ticket"] &&
              "border-s-4 border-s-[#0B64B9] bg-white dark:bg-zinc-900 font-bold"
          )}
          href="/department/it/create-ticket"
        >
          <span>
            <IoIosCreate />
          </span>
          {isDrawerOpen && <span className="text-sm">Create Ticket</span>}
        </Link>
        <Link
          className={cn(
            "w-full text-xl flex py-3 px-6 space-x-2 text-[#0B64B9]",
            activeTab === AvailableTabs["My Tickets"] &&
              "border-s-4 border-s-[#0B64B9] bg-white dark:bg-zinc-900 font-bold"
          )}
          href="/department/it/my-tickets"
        >
          <span>
            <BsTicketFill />
          </span>
          {isDrawerOpen && <span className="text-sm">My Ticket</span>}
        </Link>

        <Link
          className={cn(
            "w-full text-xl flex py-3 px-6 space-x-2 text-[#0B64B9]",
            activeTab === AvailableTabs.Accounts &&
              "border-s-4 border-s-[#0B64B9] bg-white dark:bg-zinc-900 font-bold"
          )}
          href="/department/it/accounts"
        >
          <span>
            <MdAccountBox />
          </span>
          {isDrawerOpen && <span className="text-sm">Accounts</span>}
        </Link>
      </div>
      <Button
        className="absolute top-10 -right-3 text-sm text-center"
        variant="outline"
        onClick={handleDrawerOpen}
      >
        <BsBoxArrowInLeft />
      </Button>
    </aside>
  );
};

export default MobileDrawer;
