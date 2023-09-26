import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const EditProfile = () => {
  return (
    <div className="relative py-4 flex items-center flex-col">
      <h1 className="w-full md:w-[70%]">EditProfile</h1>
      <div className="w-full md:w-[70%]">
        <form className="py-4 space-y-4">
          <Label className="flex gap-y-2 flex-col">
            <span>Fullname</span>
            <Input value="Daniel Rey" />
          </Label>

          <Label className="flex gap-y-2 flex-col">
            <span>Department</span>
            <Input value="IT" />
          </Label>
          <Button>Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
