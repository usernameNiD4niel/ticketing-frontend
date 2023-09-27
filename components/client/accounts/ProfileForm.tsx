"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UsersType } from "@/constants/types";
import React, { FC, useState } from "react";

type ProfileProps = {
  data: UsersType;
};

const ProfileForm: FC<ProfileProps> = ({ data: { user } }) => {
  const [fullName, setFullName] = useState(user.name);
  const [department, setDepartment] = useState(user.department);

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setState(event.target.value);
  };
  return (
    <>
      <Label className="flex gap-y-2 flex-col">
        <span>Fullname</span>
        <Input
          value={fullName}
          onChange={(e) => handleOnChange(e, setFullName)}
          name="name"
        />
      </Label>

      <Label className="flex gap-y-2 flex-col">
        <span>Department</span>
        <Input
          value={department}
          name="department"
          onChange={(e) => handleOnChange(e, setDepartment)}
        />
      </Label>
    </>
  );
};

export default ProfileForm;
