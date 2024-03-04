import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { FC } from "react";
import Cookies from "js-cookie";
import { BsChevronDown } from "react-icons/bs";

interface AssignRoleDropdownProps {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const AssignRoleDropdown: FC<AssignRoleDropdownProps> = ({
  selected,
  setSelected,
}) => {
  const role = Cookies.get("hr_access_level");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="text-start flex ">
          <span className="w-full">{selected}</span>
          <span>
            <BsChevronDown />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem onClick={() => setSelected("Requestor")}>
          Requestor
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSelected("Champion")}>
          Champion
        </DropdownMenuItem>
        {role?.toLowerCase() === "supreme" && (
          <DropdownMenuItem onClick={() => setSelected("Catalyst")}>
            Catalyst
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AssignRoleDropdown;
