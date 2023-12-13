"use client";

import { Button } from "../ui/button";
import { FaLocationDot } from "react-icons/fa6";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { HiMenuAlt2 } from "react-icons/hi";
import { FaHome } from "react-icons/fa";
import { IoIosCreate, IoMdNotifications } from "react-icons/io";
import { BsTicketFill } from "react-icons/bs";
import {
  MdAccountBox,
  MdMarkEmailUnread,
  MdMonitorHeart,
} from "react-icons/md";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AvailableTabs } from "@/constants/enums";
import { FC, useState } from "react";
import { AiFillFileExclamation } from "react-icons/ai";
import { RiPassPendingFill } from "react-icons/ri";
import useNavigationStore from "@/hooks/states/useNavigationStore";
import DialogBoxAlert from "../server/logout/DialogBoxAlert";

type LeftSheetProps = {
  unhandledTicketsCount: number;
  pendingRoleCount: number;
  role: string;
  myAssignedTickets: number;
};

const LeftSheet: FC<LeftSheetProps> = ({
  pendingRoleCount,
  unhandledTicketsCount,
  myAssignedTickets,
  role,
}) => {
  const [activeTab] = useNavigationStore((state) => [state.activeTab]);

  let isRequestor =
    role.toUpperCase() === "REQUESTOR" || role.toUpperCase() === "UNSET";

  const getCurrentTab = () => {
    switch (activeTab) {
      case AvailableTabs.Feed:
        return "Feed";
      case AvailableTabs.Accounts:
        return "Accounts";
      case AvailableTabs.Code:
        return "Code";
      case AvailableTabs["Create Ticket"]:
        return "Create Ticket";
      case AvailableTabs["Departments Role"]:
        return "Department Role";
      case AvailableTabs.Reports:
        return "Reports";
      case AvailableTabs["Unhandled Tickets"]:
        return "Unhandled Tickets";
      case AvailableTabs.Locations:
        return "Locations";
      case AvailableTabs.Notification:
        return "Notification";
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <Sheet key={"left"}>
          <SheetTrigger asChild>
            <Button variant="outline" className="text-xl">
              <HiMenuAlt2 />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="bg-[#EEF7FF] h-full flex flex-col justify-between"
          >
            <div>
              <SheetHeader>
                <SheetTitle className="font-bold text-4xl mt-20">
                  <Link href="/" as={"/"}>
                    <span className="text-[#0B64B9]">OP</span>
                    <span className="text-[#99CC68]">PA</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <section className="w-full items-start flex flex-col gap-y-3 mt-16">
                <SheetClose asChild>
                  <Link
                    className={cn(
                      "w-full text-xl flex py-3 px-3 space-x-2 text-[#0B64B9]",
                      activeTab === AvailableTabs.Feed &&
                        "border-s-4 border-s-[#0B64B9] bg-white dark:bg-zinc-900 font-bold"
                    )}
                    as={"/department/it"}
                    href="/department/it"
                  >
                    <span>
                      <FaHome />
                    </span>
                    <span className="text-sm">Feed</span>
                  </Link>
                </SheetClose>
                {isRequestor ? (
                  <SheetClose asChild>
                    <Link
                      className={cn(
                        "w-full text-xl flex py-3 px-3 space-x-2 text-[#0B64B9]",
                        activeTab === AvailableTabs["Create Ticket"] &&
                          "border-s-4 border-s-[#0B64B9] bg-white dark:bg-zinc-900 font-bold"
                      )}
                      as={"/department/it/create-ticket"}
                      href="/department/it/create-ticket"
                    >
                      <span>
                        <IoIosCreate />
                      </span>
                      {<span className="text-sm">Create Ticket</span>}
                    </Link>
                  </SheetClose>
                ) : (
                  <>
                    {role.toLowerCase() !== "champion" ? (
                      <SheetClose asChild>
                        <Link
                          className={cn(
                            "w-full text-xl flex py-3 px-3 space-x-2 text-[#0B64B9] relative",
                            activeTab === AvailableTabs["Departments Role"] &&
                              "border-s-4 border-s-[#0B64B9] bg-white dark:bg-zinc-900 font-bold"
                          )}
                          as={"/department/it/pending-role"}
                          href="/department/it/pending-role"
                        >
                          <span>
                            <RiPassPendingFill />
                          </span>
                          <span className="text-sm">
                            Departments Role{" "}
                            <span className="text-xs ms-2 font-bold text-red-500">
                              {pendingRoleCount !== 0 && pendingRoleCount}
                            </span>
                          </span>
                        </Link>
                      </SheetClose>
                    ) : (
                      <SheetClose asChild>
                        <Link
                          className={cn(
                            "w-full text-xl flex py-3 px-6 space-x-2 text-[#0B64B9]",
                            activeTab === AvailableTabs["Assigned Tickets"] &&
                              "border-s-4 border-s-[#0B64B9] bg-white dark:bg-zinc-900 font-bold"
                          )}
                          as={"/department/it/assigned-tickets"}
                          href="/department/it/assigned-tickets"
                        >
                          <span>
                            <IoIosCreate />
                          </span>
                          <span className="text-sm">
                            Assigned Tickets{" "}
                            <span className="text-xs ms-2 font-bold text-red-500">
                              {myAssignedTickets !== 0 && myAssignedTickets}
                            </span>
                          </span>
                        </Link>
                      </SheetClose>
                    )}
                  </>
                )}
                {!isRequestor && (
                  <SheetClose asChild>
                    <Link
                      as={"/department/it/unhandled-tickets"}
                      href="/department/it/unhandled-tickets"
                      className={cn(
                        "w-full text-xl flex py-3 px-3 space-x-2 text-[#0B64B9] relative",
                        activeTab === AvailableTabs["Unhandled Tickets"] &&
                          "border-s-4 border-s-[#0B64B9] bg-white dark:bg-zinc-900 font-bold"
                      )}
                    >
                      <span>
                        <AiFillFileExclamation />
                      </span>
                      <span className="text-sm">
                        Unhandled Tickets
                        <span className="text-xs ms-2 font-bold text-red-500">
                          {unhandledTicketsCount !== 0 && unhandledTicketsCount}
                        </span>
                      </span>
                    </Link>
                  </SheetClose>
                )}
                {!isRequestor && (
                  <SheetClose asChild>
                    <Link
                      as={"/department/it/overview"}
                      href="/department/it/overview"
                      className={cn(
                        "w-full text-xl flex py-3 px-3 space-x-2 text-[#0B64B9] relative",
                        activeTab === AvailableTabs["Reports"] &&
                          "border-s-4 border-s-[#0B64B9] bg-white dark:bg-zinc-900 font-bold"
                      )}
                    >
                      <span>
                        <MdMonitorHeart />
                      </span>
                      <span className="text-sm">Reports</span>
                    </Link>
                  </SheetClose>
                )}
                <SheetClose asChild>
                  <Link
                    className={cn(
                      "w-full text-xl flex py-3 px-3 space-x-2 text-[#0B64B9]",
                      activeTab === AvailableTabs.Accounts &&
                        "border-s-4 border-s-[#0B64B9] bg-white dark:bg-zinc-900 font-bold"
                    )}
                    as={"/department/it/accounts/recent"}
                    href="/department/it/accounts/recent"
                  >
                    <span>
                      <MdAccountBox />
                    </span>
                    <span className="text-sm">Accounts</span>
                  </Link>
                </SheetClose>
                {role && role.toUpperCase() === "SUPREME" && (
                  <>
                    <SheetClose asChild>
                      <Link
                        className={cn(
                          "w-full text-xl flex py-3 px-3 space-x-2 text-[#0B64B9]",
                          activeTab === AvailableTabs.Code &&
                            "border-s-4 border-s-[#0B64B9] bg-white dark:bg-zinc-900 font-bold"
                        )}
                        as={"/department/it/code"}
                        href="/department/it/code"
                      >
                        <span>
                          <MdMarkEmailUnread />
                        </span>
                        <span className="text-sm">Code</span>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        className={cn(
                          "w-full text-xl flex py-3 px-3 space-x-2 text-[#0B64B9]",
                          activeTab === AvailableTabs.Locations &&
                            "border-s-4 border-s-[#0B64B9] bg-white dark:bg-zinc-900 font-bold"
                        )}
                        as={"/department/it/locations"}
                        href="/department/it/locations"
                      >
                        <span>
                          <FaLocationDot />
                        </span>
                        <span className="text-sm">Locations</span>
                      </Link>
                    </SheetClose>
                  </>
                )}
                <SheetClose asChild>
                  <Link
                    className={cn(
                      "w-full text-xl flex py-3 px-3 space-x-2 text-[#0B64B9]",
                      activeTab === AvailableTabs.Notification &&
                        "border-s-4 border-s-[#0B64B9] bg-white dark:bg-zinc-900 font-bold"
                    )}
                    as={"/department/it/notification"}
                    href="/department/it/notification"
                  >
                    <span>
                      <IoMdNotifications />
                    </span>
                    <span className="text-sm">Notification</span>
                  </Link>
                </SheetClose>
              </section>
            </div>
            <DialogBoxAlert isInTheMenu={true} key={"Mobile"} />
          </SheetContent>
        </Sheet>
      </div>
      <h1 className="font-bold capitalize">{getCurrentTab()}</h1>
    </>
  );
};

export default LeftSheet;
