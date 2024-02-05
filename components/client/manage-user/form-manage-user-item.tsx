"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ComboboxDemo } from "@/components/utils/ComboBox";
import SelectCustom from "@/components/utils/SelectCustom";
import { DepartmentsOnly } from "@/constants/objects";
import { useState } from "react";

interface FormManageUserItemProps {
  email: string;
  department: string;
  role: string;
}

export default function FormManageUserItem({
  department,
  email,
  role,
}: FormManageUserItemProps) {
  const [department_, setDepartment] = useState(department);
  return (
    <form className="max-w-2xl w-full space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input defaultValue={email} type="email" name="email" id="email" />
      </div>
      <div>
        <Label>
          <span>Department</span>
          <ComboboxDemo
            department={department_}
            setDepartment={setDepartment}
            key={`${department}-${email}-ComboboxDemo`}
          />
        </Label>
      </div>
      <div>
        <Label>
          <span>Access Role</span>
          <SelectCustom
            items={["REQUESTOR", "CHAMPION", "CATALYST"]}
            name="access-role"
            width="w-full"
            placeholder=""
            defaultValue={role}
            isRequired={true}
            key={`${role}-${department}-SelectCustom`}
          />
        </Label>
      </div>
      <div className="flex gap-3 items-center">
        <Button type="submit">Update</Button>
        <Button variant={"ghost"} type="reset">
          Reset
        </Button>
      </div>
    </form>
  );
}
