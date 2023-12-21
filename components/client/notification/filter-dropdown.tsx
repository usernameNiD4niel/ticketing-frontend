import {
  BellDot,
  BellMinus,
  Cloud,
  CreditCard,
  Filter,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  Trash2,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosOptions } from "react-icons/io";
export default function FilterDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} className="text-xl">
          <IoIosOptions />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BellDot className="mr-2 h-4 w-4" />
            <span>Mark all unread</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
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
                <DropdownMenuItem>
                  <span>Today</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Yesterday</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>This week</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
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
