import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CardAccount from "@/components/utils/CardAccount";
import React, { FC } from "react";

type AccountTabProps = {
  params: { slug: string };
};

const AccountTab: FC<AccountTabProps> = ({ params }) => {
  let contentTab = null;

  if (params.slug === "recent") {
    contentTab = <Recent />;
  } else if (params.slug === "edit-profile") {
    contentTab = <EditProfile />;
  } else if (params.slug === "update-password") {
    contentTab = <UpdatePassword />;
  } else {
    contentTab = <Settings />;
  }

  return <div className="my-5 mx-3 text-xs md:text-sm">{contentTab}</div>;
};

const Recent = () => {
  return (
    <div className="flex gap-2 flex-wrap items-center justify-center">
      <CardAccount
        recentActivityDescription="Sample description"
        recentActivityTitle="Sample title"
      />
      <CardAccount
        recentActivityDescription="Sample description"
        recentActivityTitle="Sample title"
      />
      <CardAccount
        recentActivityDescription="Sample description"
        recentActivityTitle="Sample title"
      />
      <CardAccount
        recentActivityDescription="Sample description"
        recentActivityTitle="Sample title"
      />
      <CardAccount
        recentActivityDescription="Sample description"
        recentActivityTitle="Sample title"
      />
      <CardAccount
        recentActivityDescription="Sample description"
        recentActivityTitle="Sample title"
      />
      <CardAccount
        recentActivityDescription="Sample description"
        recentActivityTitle="Sample title"
      />
      <CardAccount
        recentActivityDescription="Sample description"
        recentActivityTitle="Sample title"
      />
    </div>
  );
};

const EditProfile = () => {
  return <div></div>;
};

const UpdatePassword = () => {
  return (
    <div className="flex justify-center items-center">
      <form className="flex gap-y-4 flex-col w-full md:w-[70%]">
        <h3 className="font-bold text-lg">Change Password</h3>
        <Label className="space-y-2">
          <span>Current Password</span>
          <Input placeholder="Enter your current password here" />
        </Label>
        <Label className="space-y-2">
          <span>New Password</span>
          <Input placeholder="Enter your new password here" />
        </Label>
        <Label className="space-y-2">
          <span>Confirm Password</span>
          <Input placeholder="Confirm your new password" />
        </Label>
        <div className="w-full flex justify-end items-center">
          <Button>Submit</Button>
        </div>
      </form>
    </div>
  );
};

const Settings = () => {
  return <div></div>;
};

export default AccountTab;
