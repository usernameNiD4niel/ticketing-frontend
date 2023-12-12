"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosArrowDown } from "react-icons/io";

interface DropdownStatus {
  filter_by: string;
  items: string[];
}

export default function DropdownStatus({ filter_by, items }: DropdownStatus) {
  const [status, setStatus] = React.useState("");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-fit gap-x-4 flex justify-between"
        >
          <span className="min-w-max">
            {status ? status : `Filter by ${filter_by}`}
          </span>
          <span>
            <IoIosArrowDown />
          </span>
          <input
            type="text"
            hidden={true}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            name={filter_by}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filter by {filter_by}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={status} onValueChange={setStatus}>
          {items.map((item) => (
            <DropdownMenuRadioItem value={item.toLowerCase()} key={item}>
              {item}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
