"use client";

import { updateSpecificUserAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { ComboboxDemo } from "@/components/utils/ComboBox";
import { LoadingButton } from "@/components/utils/LoadingButton";
import SelectCustom from "@/components/utils/SelectCustom";
import { useState } from "react";

interface FormManageUserItemProps {
  email: string;
  department: string;
  role: string;
  id: string;
}

export default function FormManageUserItem({
  department,
  email,
  role,
  id,
}: FormManageUserItemProps) {
  const [department_, setDepartment] = useState(department);
  const [isLoading, setIsLoading] = useState(false);

  async function handleFormAction(formData: FormData) {
    if (!department) {
      toast({
        title: "Validation Failed",
        description: "Description field is required",
      });
      return;
    }

    formData.append("department", department_);
    formData.append("id", id);

    const { message, success } = await updateSpecificUserAction(formData);

    if (success) {
      toast({
        title: "Update Success",
        description: message,
      });
    } else {
      toast({
        title: "Update Failed",
        description: message,
      });
    }
    setIsLoading(false);
  }

  function handleLoadingState() {
    setIsLoading(true);
  }

  return (
    <form
      className="max-w-2xl w-full space-y-4"
      onSubmit={handleLoadingState}
      action={handleFormAction}
    >
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
      {isLoading ? (
        <LoadingButton isFullWidth={false} />
      ) : (
        <div className="flex gap-3 items-center">
          <Button type="submit">Update</Button>
          <Button variant={"ghost"} type="reset">
            Reset
          </Button>
        </div>
      )}
    </form>
  );
}
