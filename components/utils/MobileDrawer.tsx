"use client";
import React, { FC, useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  MdAccountBox,
  MdMarkEmailUnread,
  MdMonitorHeart,
} from "react-icons/md";
import { BsTicketFill } from "react-icons/bs";
import { IoIosCreate } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { cn } from "@/lib/utils";
import Link from "next/link";
import useNavigationStore from "@/hooks/states/useNavigationStore";
import { AvailableTabs } from "@/constants/enums";
import Cookies from "js-cookie";
import {
  AiFillFileExclamation,
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
} from "react-icons/ai";
import { RiPassPendingFill } from "react-icons/ri";

type MobileDrawerProps = {
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  unhandledTicketsCount: number;
  pendingRoleCount: number;
};

const MobileDrawer: FC<MobileDrawerProps> = ({
  isDrawerOpen,
  setIsDrawerOpen,
  pendingRoleCount,
  unhandledTicketsCount,
}) => {
  const handleDrawerOpen = () => {
    setIsDrawerOpen((prevState) => !prevState);
  };

  const [activeTab] = useNavigationStore((state) => [state.activeTab]);
  const role = Cookies.get("it_access_level");

  const [isRequestor, setIsRequestor] = useState(true);

  useEffect(() => {
    if (
      role &&
      (role.toLowerCase() === "requestor" || role.toLowerCase() === "unset")
    ) {
      setIsRequestor(true);
    } else {
      setIsRequestor(false);
    }
  }, []);

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 bottom-0 bg-[#EEF7FF] dark:bg-[#1a1919] z-10 px-3 drop-shadow-xl hidden md:flex gap-y-6 flex-col items-center",
        isDrawerOpen ? "w-[350px] justify-normal" : "w-20 justify-center"
      )}
    >
      <Link
        href="/"
        className={cn("font-bold text-4xl my-24", !isDrawerOpen && "hidden")}
      >
        <span className="text-[#0B64B9]">OP</span>
        <span className="text-[#99CC68]">PA</span>
      </Link>
      <div className="flex flex-col w-full gap-y-3">
        <Link
          className={cn(
            "w-full text-xl flex py-3 px-6 space-x-2 text-[#0B64B9]",
            activeTab === AvailableTabs.Feed &&
              "border-s-4 border-s-[#0B64B9] bg-white dark:bg-zinc-900 font-bold",
            !isDrawerOpen ? "justify-center items-center" : "justify-start"
          )}
          href="/department/it"
        >
          <span>
            <FaHome />
          </span>
          {isDrawerOpen && <span className="text-sm">Feed</span>}
        </Link>
        {isRequestor ? (
          <Link
            className={cn(
              "w-full text-xl flex py-3 px-6 space-x-2 text-[#0B64B9]",
              activeTab === AvailableTabs["Create Ticket"] &&
                "border-s-4 border-s-[#0B64B9] bg-white dark:bg-zinc-900 font-bold",
              !isDrawerOpen ? "justify-center items-center" : "justify-start"
            )}
            href="/department/it/create-ticket"
          >
            <span>
              <IoIosCreate />
            </span>
            {isDrawerOpen && <span className="text-sm">Create Ticket</span>}
          </Link>
        ) : (
          <Link
            className={cn(
              "w-full text-xl flex py-3 px-6 space-x-2 text-[#0B64B9] relative",
              activeTab === AvailableTabs["Departments Role"] &&
                "border-s-4 border-s-[#0B64B9] bg-white dark:bg-zinc-900 font-bold",
              !isDrawerOpen ? "justify-center items-center" : "justify-start"
            )}
            href="/department/it/pending-role"
          >
            <span>
              <RiPassPendingFill />
            </span>
            {isDrawerOpen ? (
              <span className="text-sm">
                Departments Role{" "}
                <span className="text-xs ms-2 font-bold text-red-500">
                  {pendingRoleCount !== 0 && pendingRoleCount}
                </span>
              </span>
            ) : (
              <span className="text-xs ms-2 font-bold text-red-500 absolute right-2 top-2">
                {pendingRoleCount !== 0 && pendingRoleCount}
              </span>
            )}
          </Link>
        )}
        {isRequestor ? (
          <Link
            className={cn(
              "w-full text-xl flex py-3 px-6 space-x-2 text-[#0B64B9]",
              activeTab === AvailableTabs["Existing Tickets"] &&
                "border-s-4 border-s-[#0B64B9] bg-white dark:bg-zinc-900 font-bold",
              !isDrawerOpen ? "justify-center items-center" : "justify-start"
            )}
            href="/department/it/my-tickets"
          >
            <span>
              <BsTicketFill />
            </span>
            {isDrawerOpen && <span className="text-sm">Existing Tickets</span>}
          </Link>
        ) : (
          <Link
            href="/department/it/unhandled-tickets"
            className={cn(
              "w-full text-xl flex py-3 px-6 space-x-2 text-[#0B64B9] relative",
              activeTab === AvailableTabs["Unhandled Tickets"] &&
                "border-s-4 border-s-[#0B64B9] bg-white dark:bg-zinc-900 font-bold",
              !isDrawerOpen ? "justify-center items-center" : "justify-start"
            )}
          >
            <span>
              <AiFillFileExclamation />
            </span>
            {isDrawerOpen ? (
              <span className="text-sm">
                Unhandled Tickets
                <span className="text-xs ms-2 font-bold text-red-500">
                  {unhandledTicketsCount !== 0 && unhandledTicketsCount}
                </span>
              </span>
            ) : (
              <span className="text-xs ms-2 font-bold text-red-500 absolute top-2 right-1">
                {unhandledTicketsCount !== 0 && unhandledTicketsCount}
              </span>
            )}
          </Link>
        )}

        {!isRequestor && (
          <Link
            href="/department/it/overview"
            className={cn(
              "w-full text-xl flex py-3 px-6 space-x-2 text-[#0B64B9]",
              activeTab === AvailableTabs["Overview"] &&
                "border-s-4 border-s-[#0B64B9] bg-white dark:bg-zinc-900 font-bold",
              !isDrawerOpen ? "justify-center items-center" : "justify-start"
            )}
          >
            <span>
              <MdMonitorHeart />
            </span>
            {isDrawerOpen && <span className="text-sm">Overview</span>}
          </Link>
        )}

        <Link
          className={cn(
            "w-full text-xl flex py-3 px-6 space-x-2 text-[#0B64B9]",
            activeTab === AvailableTabs.Accounts &&
              "border-s-4 border-s-[#0B64B9] bg-white dark:bg-zinc-900 font-bold",
            !isDrawerOpen ? "justify-center items-center" : "justify-start"
          )}
          href="/department/it/accounts/recent"
        >
          <span>
            <MdAccountBox />
          </span>
          {isDrawerOpen && <span className="text-sm">Accounts</span>}
        </Link>

        {role && role === "SUPREME" && (
          <Link
            className={cn(
              "w-full text-xl flex py-3 px-6 space-x-2 text-[#0B64B9]",
              activeTab === AvailableTabs.Code &&
                "border-s-4 border-s-[#0B64B9] bg-white dark:bg-zinc-900 font-bold",
              !isDrawerOpen ? "justify-center items-center" : "justify-start"
            )}
            href="/department/it/code"
          >
            <span>
              <MdMarkEmailUnread />
            </span>
            {isDrawerOpen && <span className="text-sm">Code</span>}
          </Link>
        )}
      </div>
      <Button
        className="absolute top-10 -right-3 text-sm text-center"
        variant="outline"
        onClick={handleDrawerOpen}
      >
        {isDrawerOpen ? <AiOutlineDoubleLeft /> : <AiOutlineDoubleRight />}
      </Button>
    </aside>
  );
};

export default MobileDrawer;
