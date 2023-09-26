"use client";

import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { HiMenuAlt2 } from "react-icons/hi";
import { FaHome } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { BsTicketFill } from "react-icons/bs";
import { MdAccountBox } from "react-icons/md";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AvailableTabs } from "@/constants/enums";
import { FC, useState } from "react";
import { AiFillFileExclamation } from "react-icons/ai";
import { RiPassPendingFill } from "react-icons/ri";

type LeftSheetProps = {
  isDrawerOpen: boolean;
  unhandledTicketsCount: number;
  pendingRoleCount: number;
  activeTab: AvailableTabs;
  role?: string;
};

const LeftSheet: FC<LeftSheetProps> = ({
  activeTab,
  isDrawerOpen,
  pendingRoleCount,
  unhandledTicketsCount,
  role,
}) => {
  let isRequestor = true;
  if ((role && role === "requestor") || role === "unset") {
    isRequestor = true;
  } else {
    isRequestor = false;
  }

  const [isOpen, setIsOpen] = useState(false);

  const handleDrawerOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <Sheet key={"left"} open={isOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="text-xl"
            onClick={handleDrawerOpen}
          >
            <HiMenuAlt2 />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="bg-[#EEF7FF]"
          onClick={handleDrawerOpen}
        >
          <SheetHeader>
            <SheetTitle className="font-bold text-4xl mt-20">
              <Link href="/">
                <span className="text-[#0B64B9]">OP</span>
                <span className="text-[#99CC68]">PA</span>
              </Link>
            </SheetTitle>
          </SheetHeader>
          <section className="w-full items-start flex flex-col gap-y-3 mt-16">
            <Link
              className={cn(
                "w-full text-xl flex py-3 px-3 space-x-2 text-[#0B64B9]",
                activeTab === AvailableTabs.Feed &&
                  "border-s-4 border-s-[#0B64B9] bg-white dark:bg-zinc-900 font-bold",
                !isDrawerOpen ? "justify-center items-center" : "justify-start"
              )}
              href="/department/it"
              onClick={handleDrawerOpen}
            >
              <span>
                <FaHome />
              </span>
              {isDrawerOpen && <span className="text-sm">Feed</span>}
            </Link>
            {isRequestor ? (
              <Link
                className={cn(
                  "w-full text-xl flex py-3 px-3 space-x-2 text-[#0B64B9]",
                  activeTab === AvailableTabs["Create Ticket"] &&
                    "border-s-4 border-s-[#0B64B9] bg-white dark:bg-zinc-900 font-bold",
                  !isDrawerOpen
                    ? "justify-center items-center"
                    : "justify-start"
                )}
                href="/department/it/create-ticket"
                onClick={handleDrawerOpen}
              >
                <span>
                  <IoIosCreate />
                </span>
                {isDrawerOpen && <span className="text-sm">Create Ticket</span>}
              </Link>
            ) : (
              <Link
                className={cn(
                  "w-full text-xl flex py-3 px-3 space-x-2 text-[#0B64B9]",
                  activeTab === AvailableTabs["Pending Role"] &&
                    "border-s-4 border-s-[#0B64B9] bg-white dark:bg-zinc-900 font-bold",
                  !isDrawerOpen
                    ? "justify-center items-center"
                    : "justify-start"
                )}
                onClick={handleDrawerOpen}
                href="/department/it/pending-role"
              >
                <span>
                  <RiPassPendingFill />
                </span>
                {isDrawerOpen ? (
                  <span className="text-sm">
                    Pending Role{" "}
                    <span className="text-xs ms-2 font-bold text-red-500">
                      {pendingRoleCount !== 0 && pendingRoleCount}
                    </span>
                  </span>
                ) : (
                  <span className="text-xs ms-2 font-bold text-red-500 absolute top-2 right-1">
                    {pendingRoleCount !== 0 && pendingRoleCount}
                  </span>
                )}
              </Link>
            )}
            {isRequestor ? (
              <Link
                className={cn(
                  "w-full text-xl flex py-3 px-3 space-x-2 text-[#0B64B9]",
                  activeTab === AvailableTabs["My Tickets"] &&
                    "border-s-4 border-s-[#0B64B9] bg-white dark:bg-zinc-900 font-bold",
                  !isDrawerOpen
                    ? "justify-center items-center"
                    : "justify-start"
                )}
                onClick={handleDrawerOpen}
                href="/department/it/my-tickets"
              >
                <span>
                  <BsTicketFill />
                </span>
                {isDrawerOpen && <span className="text-sm">My Ticket</span>}
              </Link>
            ) : (
              <Link
                href="/department/it/unhandled-tickets"
                className={cn(
                  "w-full text-xl flex py-3 px-3 space-x-2 text-[#0B64B9] relative",
                  activeTab === AvailableTabs["Unhandled Tickets"] &&
                    "border-s-4 border-s-[#0B64B9] bg-white dark:bg-zinc-900 font-bold",
                  !isDrawerOpen
                    ? "justify-center items-center"
                    : "justify-start"
                )}
                onClick={handleDrawerOpen}
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

            <Link
              className={cn(
                "w-full text-xl flex py-3 px-3 space-x-2 text-[#0B64B9]",
                activeTab === AvailableTabs.Accounts &&
                  "border-s-4 border-s-[#0B64B9] bg-white dark:bg-zinc-900 font-bold",
                !isDrawerOpen ? "justify-center items-center" : "justify-start"
              )}
              href="/department/it/accounts/recent"
              onClick={handleDrawerOpen}
            >
              <span>
                <MdAccountBox />
              </span>
              {isDrawerOpen && <span className="text-sm">Accounts</span>}
            </Link>
          </section>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default LeftSheet;
