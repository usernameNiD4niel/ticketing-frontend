import { BellDot, BellMinus, Filter, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosOptions } from "react-icons/io";
import { Notifications } from "@/constants/types";
import {
  notificationFilterAction,
  updateNotificationSeenAction,
} from "@/app/actions";
import { deleteAllNotificationAction } from "@/app/actions";
import { toast } from "@/components/ui/use-toast";

interface FilterDropdownProps {
  notif: Notifications[];
  setNotif: React.Dispatch<React.SetStateAction<Notifications[]>>;
}

export default function FilterDropdown({
  setNotif,
  notif,
}: FilterDropdownProps) {
  async function handleFiltering(
    operation: "filter today" | "filter this week" | "filter this month"
  ) {
    const data = await notificationFilterAction(operation);
    setNotif(data);
  }

  async function handleClick(operation: "mark all read" | "mark all unread") {
    if (notif.length === 0) {
      return;
    }

    const ids = notif
      .filter((item) => {
        if (operation === "mark all read") {
          return !item.is_seen;
        }
        return item.is_seen;
      })
      .map((item) => item.id);

    await updateNotificationSeenAction(operation, ids);
  }

  async function handleDeleteAll() {
    if (notif.length === 0) {
      return;
    }

    const { message, success } = await deleteAllNotificationAction();

    if (success) {
      toast({
        title: "Deleted Successfully",
        description: message,
      });
    } else {
      toast({
        title: "Deletion Failed",
        description: message,
      });
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} className="text-xl">
          <IoIosOptions />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleClick("mark all unread")}>
            <BellDot className="mr-2 h-4 w-4" />
            <span>Mark all unread</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleClick("mark all read")}>
            <BellMinus className="mr-2 h-4 w-4" />
            <span>Mark all read</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Filter className="mr-2 h-4 w-4" />
              <span>Filter</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onClick={() => handleFiltering("filter today")}
                >
                  <span>Today</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleFiltering("filter this week")}
                >
                  <span>This week</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleFiltering("filter this month")}
                >
                  <span>This month</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDeleteAll}>
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Delete all</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
