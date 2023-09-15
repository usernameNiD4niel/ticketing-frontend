"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Departments } from "@/constants/objects";
type ComboboxDemo = {
  department: string;
  setDepartment: React.Dispatch<React.SetStateAction<string>>;
};

export const ComboboxDemo: React.FC<ComboboxDemo> = ({
  department,
  setDepartment,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {department ? department : "Select your department..."}
          {/* {department.toUpperCase()} */}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search department..." />
          <CommandEmpty>Department not found.</CommandEmpty>
          <CommandGroup>
            {Departments.map((departmentItem) => (
              <CommandItem
                key={departmentItem.value}
                onSelect={(currentValue) => {
                  setDepartment(
                    currentValue === department
                      ? ""
                      : currentValue.toUpperCase()
                  );
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    department === departmentItem.value
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {departmentItem.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

/*

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Departments } from '@/constants/objects';
import { useFormContext } from 'react-hook-form';

type ComboboxDemoProps = {
  department: string;
  setDepartment: React.Dispatch<React.SetStateAction<string>>;
};

export const ComboboxDemo: React.FC<ComboboxDemoProps> = ({
  department,
  setDepartment,
}) => {
  const [open, setOpen] = React.useState(false);
  const { register } = useFormContext(); // Access react-hook-form context for validation

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {department
            ? Departments.find(
                (departmentItem) => departmentItem.value === department
              )?.label
            : 'Select your department...'}
          {department.toUpperCase()}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search department..." />
          <CommandEmpty>Department not found.</CommandEmpty>
          <CommandGroup>
            {Departments.map((departmentItem) => (
              <CommandItem
                key={departmentItem.value}
                onSelect={(currentValue) => {
                  setDepartment(
                    currentValue === department
                      ? ''
                      : currentValue.toUpperCase()
                  );
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    department === departmentItem.value
                      ? 'opacity-100'
                      : 'opacity-0'
                  )}
                />
                {departmentItem.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};


*/
