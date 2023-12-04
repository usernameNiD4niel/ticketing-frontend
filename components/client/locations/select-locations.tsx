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

interface SelectLocationsProps {
  setLocations: React.Dispatch<React.SetStateAction<string>>;
}

export function SelectLocations({ setLocations }: SelectLocationsProps) {
  const handleChange = (value: string) => {
    setLocations(value);
  };

  return (
    <Select required onValueChange={handleChange}>
      <SelectTrigger
        className="w-full"
        name="selectedLocation"
        id="selectedLocation"
      >
        <SelectValue
          placeholder="Select a location"
          className="placeholder:text-gray-600"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={"haig"} className="text-gray-600">
            Haig - Head Office
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
