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
import { Label } from "../ui/label";

type CustomSelectProps = {
  selectedState: string;
  label: string;
  selectItems: string[];
  isFullWidth: boolean;
};

const CustomSelect: React.FC<CustomSelectProps> = ({
  selectedState,
  label,
  selectItems,
  isFullWidth,
}) => {
  const [value, setValue] = React.useState(selectedState);

  const handleOnSelectedRole = (value: string) => {
    setValue(value);
  };

  return (
    <Label className="space-y-2">
      <span>{label}</span>
      <Select
        onValueChange={handleOnSelectedRole}
        name={label.toLowerCase().split(" ").join("_")}
      >
        <SelectTrigger className={isFullWidth ? "w-full" : "w-[280px]"}>
          <SelectValue placeholder={value} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {selectItems.map((selectItem, index) => (
              <SelectItem value={selectItem.toUpperCase()} key={index}>
                {selectItem.toUpperCase()}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Label>
  );
};

export default CustomSelect;
