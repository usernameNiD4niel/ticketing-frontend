import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
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
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    if (!selectedState || selectedState.length === 0) {
      setValue(selectItems[0].toUpperCase());
    } else {
      setValue(selectedState.toUpperCase());
    }
  }, []);

  const handleOnSelectedRole = (value_: string) => {
    if (value_ && value_.length > 0) {
      setValue(value_);
    }
  };

  return (
    <Label className="space-y-2">
      <span>
        {label} {selectedState}
      </span>
      <Select
        value={value}
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
