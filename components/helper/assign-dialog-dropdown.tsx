import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { ChampionsResponse } from "@/constants/hr/types";
import React, { FC } from "react";
import { BsChevronDown } from "react-icons/bs";

interface AssignDialogDropdownProps {
  item: ChampionsResponse[];
  selectedAssigned: string;
  setItem: React.Dispatch<React.SetStateAction<string>>;
}

const AssignDialogDropdown: FC<AssignDialogDropdownProps> = ({
  item,
  setItem,
  selectedAssigned,
}) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="grid w-full gap-3 grid-cols-[90px_1fr] items-center">
            <Label>Assigned To</Label>
            <Button variant={"outline"} className="w-full relative">
              <span className="text-start w-full">{selectedAssigned}</span>
              <span className="absolute right-3 text-gray-600 top-1 mt-2">
                <BsChevronDown />
              </span>
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[250px]">
          {item.map((champion) => (
            <DropdownMenuItem
              onClick={() => setItem(champion.champion)}
              key={champion.id}
            >
              <span className="py-1">{champion.champion}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default AssignDialogDropdown;
