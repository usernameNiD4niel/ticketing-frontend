import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Locations } from "@/constants/types";
import { UseFormReturn } from "react-hook-form";

interface SelectLocationsProps {
  locations: Locations[];
  setLocations: React.Dispatch<React.SetStateAction<string>>;
  form: UseFormReturn<
    {
      updatedLocation: string;
    },
    any,
    undefined
  >;
}

export function SelectLocations({
  setLocations,
  form,
  locations,
}: SelectLocationsProps) {
  const handleChange = (value: string) => {
    setLocations(value);
    form.setValue("updatedLocation", value);
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
          {locations && locations.length > 0 ? (
            locations.map((location) => (
              <SelectItem value={location.location} key={location.created_at}>
                {location.location}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="">Add location first</SelectItem>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
