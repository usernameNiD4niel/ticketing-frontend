"use client";

import { IoNotificationsOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const RightSheet = () => {
  return (
    <div className="fixed bottom-16 md:bottom-20 mb-2 right-1 md:right-8 text-2xl flex bg-stone-900 text-stone-50 hover:bg-stone-900/90 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-50/90 rounded-full w-12 h-12 items-center justify-center hover:cursor-pointer">
      {/* <div className="grid grid-cols-2 gap-2"> */}
      <Sheet key={"right"}>
        <SheetTrigger asChild>
          <Button
            variant="noVariant"
            className="text-center flex items-center justify-center rounded-full w-12 h-12"
          >
            <span className="text-xl">
              <IoNotificationsOutline />
            </span>
            <span className="text-[0.65rem] absolute top-2 right-2">+1</span>
          </Button>
        </SheetTrigger>
        <SheetContent side={"right"} className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Notifications</SheetTitle>
            <SheetDescription>
              Changes to ticket will appear here
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-y-2 my-4">
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

const NotificationCard = () => {
  return (
    <div className="w-full hover:cursor-pointer hover:border-s-2 hover:border-s-[#0B64B9] p-3 hover:text-[#0B64B9]">
      <p className="text-sm">Sir Don assigned this ticket to Bry Bautista</p>
    </div>
  );
};

export default RightSheet;
