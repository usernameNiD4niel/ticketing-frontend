import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CustomSelect = () => {
  return (
    <Select>
      <SelectTrigger className="w-[280px] ">
        <SelectValue placeholder="Select a role" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Roles</SelectLabel>
          <SelectItem value="requestor">Requestor</SelectItem>
          <SelectItem value="champion">Champion</SelectItem>
          <SelectItem value="catalyst">Catalyst</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
