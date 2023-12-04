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

export default function DropdownStatus() {
  const [status, setStatus] = React.useState("");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-fit gap-x-4 flex justify-between"
        >
          <span className="min-w-max">
            {status ? status : "Filter by status"}
          </span>
          <span>
            <IoIosArrowDown />
          </span>
          <input
            type="text"
            hidden={true}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            name="status"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={status} onValueChange={setStatus}>
          <DropdownMenuRadioItem value="open">OPEN</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="closed">CLOSED</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="re-opened">
            RE-OPENED
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="expired">EXPIRED</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="resolved">
            RESOLVED
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
