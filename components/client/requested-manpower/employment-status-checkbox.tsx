import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import React, { FC } from "react";

interface EmploymentStatusCheckboxProps {
  active_status: string;
}

const EmploymentStatusCheckbox: FC<EmploymentStatusCheckboxProps> = ({
  active_status,
}) => {
  const status = ["Probationary", "Agency", "Project Based"];
  return status.map((stat, index) => (
    <div className="flex gap-x-1 items-center" key={index}>
      <Checkbox
        id={stat.toLowerCase()}
        key={stat}
        checked={active_status.toUpperCase() === stat.toUpperCase()}
      />
      <Label
        htmlFor={stat.toLowerCase()}
        className="text-xs md:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {stat}
      </Label>
    </div>
  ));
};

export default EmploymentStatusCheckbox;
