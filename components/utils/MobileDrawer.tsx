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
import { FaLocationDot } from "react-icons/fa6";
import DialogBoxAlert from "../server/logout/DialogBoxAlert";

type MobileDrawerProps = {
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  unhandledTicketsCount: number;
  pendingRoleCount: number;
  my_assigned_tickets: number;
};

const MobileDrawer: FC<MobileDrawerProps> = ({
  isDrawerOpen,
  setIsDrawerOpen,
  pendingRoleCount,
  unhandledTicketsCount,
  my_assigned_tickets,
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
        as={"/"}
        href="/"
        className={cn("font-bold text-4xl my-24", !isDrawerOpen && "hidden")}
      >
        <span className="text-[#0B64B9]">OP</span>
        <span className="text-[#99CC68]">PA</span>
      </Link>
      <div
        className={cn(
          "flex flex-col w-full h-full pb-4",
          isDrawerOpen ? "justify-between" : "justify-center"
        )}
      >
        <div className={"flex flex-col w-full gap-y-3"}>
          <Link
            className={cn(
              "w-full text-xl flex py-3 px-6 space-x-2 text-[#0B64B9]",
              activeTab === AvailableTabs.Feed &&
                "border-s-4 border-s-[#0B64B9] bg-white dark:bg-zinc-900 font-bold",
              !isDrawerOpen ? "justify-center items-center" : "justify-start"
            )}
            as={"/department/it"}
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
              as={"/department/it/create-ticket"}
              href="/department/it/create-ticket"
            >
              <span>
                <IoIosCreate />
              </span>
              {isDrawerOpen && <span className="text-sm">Create Ticket</span>}
            </Link>
          ) : role?.toLowerCase() !== "champion" ? (
            <Link
              className={cn(
                "w-full text-xl flex py-3 px-6 space-x-2 text-[#0B64B9] relative",
                activeTab === AvailableTabs["Departments Role"] &&
                  "border-s-4 border-s-[#0B64B9] bg-white dark:bg-zinc-900 font-bold",
                !isDrawerOpen ? "justify-center items-center" : "justify-start"
              )}
              as={"/department/it/pending-role"}
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
                <span className="text-xs ms-2 font-bold text-red-500 absolute right-1 top-2">
                  {pendingRoleCount !== 0 && pendingRoleCount}
                </span>
              )}
            </Link>
          ) : (
            <Link
              className={cn(
                "w-full text-xl flex py-3 px-6 space-x-2 text-[#0B64B9] relative",
                activeTab === AvailableTabs["Assigned Tickets"] &&
                  "border-s-4 border-s-[#0B64B9] bg-white dark:bg-zinc-900 font-bold",
                !isDrawerOpen ? "justify-center items-center" : "justify-start"
              )}
              as={"/department/it/assigned-tickets"}
              href="/department/it/assigned-tickets"
            >
              <span>
                <IoIosCreate />
              </span>
              {isDrawerOpen ? (
                <span className="text-sm">
                  Assigned Tickets
                  <span className="text-xs ms-2 font-bold text-red-500">
                    {my_assigned_tickets !== 0 && my_assigned_tickets}
                  </span>
                </span>
              ) : (
                <span className="text-xs ms-2 font-bold text-red-500 absolute top-2 right-1">
                  {my_assigned_tickets !== 0 && my_assigned_tickets}
                </span>
              )}
            </Link>
          )}
          {!isRequestor && (
            <Link
              as={"/department/it/unhandled-tickets"}
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
              as={"/department/it/overview"}
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
            as={"/department/it/accounts/recent"}
            href="/department/it/accounts/recent"
          >
            <span>
              <MdAccountBox />
            </span>
            {isDrawerOpen && <span className="text-sm">Accounts</span>}
          </Link>
          {role && role.toUpperCase() === "SUPREME" && (
            <>
              <Link
                className={cn(
                  "w-full text-xl flex py-3 px-6 space-x-2 text-[#0B64B9]",
                  activeTab === AvailableTabs.Code &&
                    "border-s-4 border-s-[#0B64B9] bg-white dark:bg-zinc-900 font-bold",
                  !isDrawerOpen
                    ? "justify-center items-center"
                    : "justify-start"
                )}
                as={"/department/it/code"}
                href="/department/it/code"
              >
                <span>
                  <MdMarkEmailUnread />
                </span>
                {isDrawerOpen && <span className="text-sm">Code</span>}
              </Link>
              <Link
                className={cn(
                  "w-full text-xl flex py-3 px-6 space-x-2 text-[#0B64B9]",
                  activeTab === AvailableTabs.Locations &&
                    "border-s-4 border-s-[#0B64B9] bg-white dark:bg-zinc-900 font-bold",
                  !isDrawerOpen
                    ? "justify-center items-center"
                    : "justify-start"
                )}
                as={"/department/it/locations"}
                href="/department/it/locations"
              >
                <span>
                  <FaLocationDot />
                </span>
                {isDrawerOpen && <span className="text-sm">Locations</span>}
              </Link>
            </>
          )}
        </div>
        {isDrawerOpen && (
          <DialogBoxAlert isInTheMenu={true} key={"PCNavigationMenu"} />
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
