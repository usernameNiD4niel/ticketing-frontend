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
  setSelectedState: React.Dispatch<React.SetStateAction<string>>;
  selectedState: string;
  placeHolder: string;
  label: string;
  selectItems: string[];
  isFullWidth: boolean;
};

const CustomSelect: React.FC<CustomSelectProps> = ({
  setSelectedState,
  selectedState,
  label,
  placeHolder,
  selectItems,
  isFullWidth,
}) => {
  const handleOnSelectedRole = (value: string) => {
    setSelectedState(value);
  };
  return (
    <Label className="space-y-2">
      <span>{label}</span>
      <Select onValueChange={handleOnSelectedRole}>
        <SelectTrigger className={isFullWidth ? "w-full" : "w-[280px]"}>
          <SelectValue
            placeholder={selectedState ? selectedState : placeHolder}
          />
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
