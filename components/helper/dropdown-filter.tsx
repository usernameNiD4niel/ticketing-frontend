"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { BsChevronDown } from "react-icons/bs";

interface DropdownFilterProps {
  column: string;
  setColumn: React.Dispatch<React.SetStateAction<string>>;
}

const DropdownFilter = ({ column, setColumn }: DropdownFilterProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="absolute h-full flex gap-x-1 m-0 px-2 rounded-none"
          variant="outline"
          style={{
            borderTopLeftRadius: "0.375rem",
            borderBottomLeftRadius: "0.375rem",
          }}
        >
          <span>{column}</span>
          <span className="text-sm">
            <BsChevronDown />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom">
        <DropdownMenuItem onClick={() => setColumn("applicant")}>
          applicant
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setColumn("creator")}>
          creator
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setColumn("position")}>
          position
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownFilter;
