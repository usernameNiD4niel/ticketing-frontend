"use client";
import { IoNotificationsOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { FC } from "react";
import { ActivitiesProps } from "@/constants/types";

type RightSheetProps = {
  handleShowRightSheet: React.MouseEventHandler<HTMLButtonElement>;
  activities: ActivitiesProps | null;
  error: string;
  isFetching: boolean;
  count: number;
};

const RightSheet: FC<RightSheetProps> = ({
  handleShowRightSheet,
  activities,
  error,
  count,
  isFetching,
}) => {
  return (
    <div className="fixed bottom-16 md:bottom-20 mb-2 right-1 md:right-8 text-2xl flex bg-stone-900 text-stone-50 hover:bg-stone-900/90 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-50/90 rounded-full w-12 h-12 items-center justify-center hover:cursor-pointer">
      {/* <div className="grid grid-cols-2 gap-2"> */}
      <Sheet key={"right"}>
        <SheetTrigger asChild>
          <Button
            variant="noVariant"
            className="text-center flex items-center justify-center rounded-full w-12 h-12"
            onClick={handleShowRightSheet}
          >
            <span className="text-xl">
              <IoNotificationsOutline />
            </span>
            <span className="text-[0.65rem] absolute top-2 right-2 font-bold">
              {count > 0 && `+${count}`}
            </span>
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
            {isFetching && <div>Please wait...</div>}
            {error && <div>{error}</div>}
            {activities ? (
              activities.activities.map((activity) => (
                <NotificationCard
                  key={activity.id}
                  description={activity.details}
                />
              ))
            ) : (
              <div>No data found</div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

type NotificationCardProps = {
  description: string;
};

const NotificationCard: FC<NotificationCardProps> = ({ description }) => {
  return (
    <div className="w-full hover:cursor-pointer hover:border-s-2 hover:border-s-[#0B64B9] p-3 hover:text-[#0B64B9]">
      <p className="text-xs">{description}</p>
    </div>
  );
};

export default RightSheet;
