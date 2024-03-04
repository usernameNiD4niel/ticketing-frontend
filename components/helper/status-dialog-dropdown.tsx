import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import React, { FC } from "react";
import { BsChevronDown } from "react-icons/bs";

interface StatusDialogDropdownProps {
  item: string | null;
  setItem: React.Dispatch<React.SetStateAction<string | null>>;
}

const StatusDialogDropdown: FC<StatusDialogDropdownProps> = ({
  item,
  setItem,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="grid w-full gap-3 grid-cols-[90px_1fr] items-center">
          <Label>Status</Label>
          <Button variant={"outline"} className="w-full relative">
            <span className="text-start w-full">
              {item ? item.toUpperCase() : "OPEN"}
            </span>
            <span className="absolute right-3 text-gray-600 top-1 mt-2">
              <BsChevronDown />
            </span>
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[250px]">
        <DropdownMenuItem onClick={() => setItem("Open")}>
          <span className="py-1">Open</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setItem("Closed")}>
          <span className="py-1">Closed</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setItem("Sourcing")}>
          <span className="py-1">Sourcing</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setItem("For Interview")}>
          <span className="py-1">For Interview</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setItem("Hire Cancel")}>
          <span className="py-1">Hire Cancel</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StatusDialogDropdown;
