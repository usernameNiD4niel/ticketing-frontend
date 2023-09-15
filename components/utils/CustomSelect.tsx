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

type CustomSelectProps = {
  setSelectedRole: React.Dispatch<React.SetStateAction<string>>;
  selectedRole: string;
};

const CustomSelect: React.FC<CustomSelectProps> = ({
  setSelectedRole,
  selectedRole,
}) => {
  const handleOnSelectedRole = (value: string) => {
    setSelectedRole(value);
  };
  return (
    <Select onValueChange={handleOnSelectedRole}>
      <SelectTrigger className="w-[280px] ">
        <SelectValue
          placeholder={selectedRole ? selectedRole : "Select a role"}
        />
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
