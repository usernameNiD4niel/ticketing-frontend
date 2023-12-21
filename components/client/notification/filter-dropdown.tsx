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
import { notificationFilterAction } from "@/app/actions";

interface FilterDropdownProps {
  setNotif: React.Dispatch<React.SetStateAction<Notifications[]>>;
}

export default function FilterDropdown({ setNotif }: FilterDropdownProps) {
  async function handleFiltering(
    operation: "filter today" | "filter this week" | "filter this month"
  ) {
    const data = await notificationFilterAction(operation);
    setNotif(data);
  }

  function handleClick(operation: "mark all read" | "mark all unread") {
    console.log(`you click ${operation}`);
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
        <DropdownMenuItem>
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Delete all</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
