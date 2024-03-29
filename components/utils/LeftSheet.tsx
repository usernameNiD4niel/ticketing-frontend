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
import {
  MdAccountBox,
  MdManageAccounts,
  MdMarkEmailUnread,
  MdMonitorHeart,
} from "react-icons/md";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AvailableTabs } from "@/constants/enums";
import { FC } from "react";
import { AiFillFileExclamation } from "react-icons/ai";
import { RiPassPendingFill } from "react-icons/ri";
import useNavigationStore from "@/hooks/states/useNavigationStore";
import DialogBoxAlert from "../server/logout/DialogBoxAlert";
import { Avatar, AvatarFallback } from "../ui/avatar";
import Cookies from "js-cookie";

type LeftSheetProps = {
  unhandledTicketsCount: number;
  pendingRoleCount: number;
  role: string;
  myAssignedTickets: number;
  count: number;
};

const LeftSheet: FC<LeftSheetProps> = ({
  pendingRoleCount,
  unhandledTicketsCount,
  myAssignedTickets,
  count,
  role,
}) => {
  const [activeTab] = useNavigationStore((state) => [state.activeTab]);

  const isRequestor =
    role.toUpperCase() === "REQUESTOR" || role.toUpperCase() === "UNSET";

  const name = Cookies.get("name")?.toString();

  const getCurrentTab = () => {
    switch (activeTab) {
      case AvailableTabs.Feed:
        return "Feed";
      case AvailableTabs.Accounts:
        return "Profile";
      case AvailableTabs.Code:
        return "Code";
      case AvailableTabs["Create Ticket"]:
        return "Create Ticket";
      case AvailableTabs["Departments Role"]:
        return "Users for Approval";
      case AvailableTabs.Reports:
        return "Reports";
      case AvailableTabs["Unhandled Tickets"]:
        return "Unhandled Tickets";
      case AvailableTabs.Locations:
        return "Locations";
      case AvailableTabs.Notification:
        return "Notification";
      case AvailableTabs["Ticket Types"]:
        return "Ticket Types";
      case AvailableTabs["Manage User"]:
        return "Manage User";
      case AvailableTabs["Assigned Tickets"]:
        return "Assigned Tickets";
    }
  };

  function formatName() {
    if (name) {
      const choppedName = name.split(" ");

      if (choppedName.length > 3) {
        return (
          choppedName[0].charAt(0).toUpperCase() +
          choppedName[choppedName.length - 1].charAt(0).toUpperCase()
        );
      }

      let temp = "";

      for (const name_ of choppedName) {
        temp += name_.charAt(0);
      }

      temp = temp.toUpperCase();

      return temp;
    }
    return "DVX";
  }

  return (
    <>
      <div>
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
                <SheetTitle className="font-bold text-4xl">
                  <Link
                    href="/department/it/accounts/recent"
                    as={"/department/it/accounts/recent"}
                    className="flex items-center flex-col justify-center gap-2"
                  >
                    <Avatar className="text-2xl font-bold text-white p-12 bg-[#0964B9]">
                      <AvatarFallback>
                        {formatName().toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-base font-medium">{name}</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <section className="w-full items-start flex flex-col gap-y-3 mt-10">
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
                {!isRequestor && (
                  <>
                    <SheetClose asChild>
                      <Link
                        className={cn(
                          "w-full text-xl flex py-3 px-3 space-x-2 text-[#0B64B9]",
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
                            {unhandledTicketsCount !== 0 &&
                              unhandledTicketsCount}
                          </span>
                        </span>
                      </Link>
                    </SheetClose>
                  </>
                )}
                <hr className="w-full bg-slate-600 h-[1px]" />
                {(role.toLowerCase() === "catalyst" ||
                  role.toLowerCase() === "supreme") && (
                  <>
                    <SheetClose asChild>
                      <Link
                        className={cn(
                          "w-full text-xl flex py-3 px-3 space-x-2 text-[#0B64B9] relative",
                          activeTab === AvailableTabs["Ticket Types"] &&
                            "border-s-4 border-s-[#0B64B9] bg-white dark:bg-zinc-900 font-bold"
                        )}
                        as={"/department/it/ticket-types"}
                        href="/department/it/ticket-types"
                      >
                        <span>
                          <RiPassPendingFill />
                        </span>
                        <span className="text-sm">Ticket Types</span>
                      </Link>
                    </SheetClose>
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
                          Users for Approval{" "}
                          <span className="text-xs ms-2 font-bold text-red-500">
                            {pendingRoleCount !== 0 && pendingRoleCount}
                          </span>
                        </span>
                      </Link>
                    </SheetClose>
                  </>
                )}
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
                    <span className="text-sm">
                      Notification{" "}
                      <span className="text-xs ms-2 font-bold text-red-500">
                        {count !== 0 && count}
                      </span>
                    </span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    className={cn(
                      "w-full text-xl flex py-3 px-3 space-x-2 text-[#0B64B9]",
                      activeTab === AvailableTabs.Accounts &&
                        "border-s-4 border-s-[#0B64B9] bg-white dark:bg-zinc-900 font-bold"
                    )}
                    as={"/department/it/accounts/update-password"}
                    href="/department/it/accounts/update-password"
                  >
                    <span>
                      <MdAccountBox />
                    </span>
                    <span className="text-sm">Profile</span>
                  </Link>
                </SheetClose>
                {(role.toLowerCase() === "catalyst" ||
                  role.toLowerCase() === "supreme") && (
                  <SheetClose asChild>
                    <Link
                      className={cn(
                        "w-full text-xl flex py-3 px-3 space-x-2 text-[#0B64B9]",
                        activeTab === AvailableTabs["Manage User"] &&
                          "border-s-4 border-s-[#0B64B9] bg-white dark:bg-zinc-900 font-bold"
                      )}
                      as={"/department/it/manage-user"}
                      href="/department/it/manage-user"
                    >
                      <span>
                        <MdManageAccounts />
                      </span>
                      <span className="text-sm">Manage User</span>
                    </Link>
                  </SheetClose>
                )}
              </section>
            </div>
            <DialogBoxAlert isInTheMenu={true} key={"Mobile"} />
          </SheetContent>
        </Sheet>
      </div>
      <h1 className="font-bold capitalize text-center">{getCurrentTab()}</h1>
    </>
  );
};

export default LeftSheet;
