"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ComboboxDemo } from "./ComboBox";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import { AlertDialogDemo } from "./AlertDialogDemo";

export function DialogBox() {
  const [showAlertDialog, setShowAlertDialog] = useState<boolean>(false);

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setShowAlertDialog(true);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">Forgot Password?</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <form onSubmit={handleOnSubmit}>
          <DialogHeader>
            <DialogTitle className="text-2xl">
              You forgot your password?
            </DialogTitle>
            <DialogDescription>
              Don't worry we'll get your account in just a simple steps
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 w-full">
            <div className="flex justify-center flex-col gap-y-2">
              <Label htmlFor="fullName">Fullname</Label>
              <Input
                id="fullName"
                placeholder="Juan Tamad"
                className="col-span-3"
                required
              />
            </div>
            <div className="flex flex-col justify-center gap-y-2">
              <Label className="flex gap-y-2 flex-col">
                Department
                <ComboboxDemo />
              </Label>
            </div>
            <div className="flex flex-col justify-center gap-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="juantamad@devexsolutions.com"
                type="email"
                className="col-span-3"
                required
              />
            </div>
            <div className="flex flex-col justify-center gap-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                placeholder="Enter your new password"
                className="col-span-3"
                type="password"
                required
              />
            </div>
            <div className="flex flex-col justify-center gap-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Re-type your new password"
                className="col-span-3"
                required
              />
            </div>
            <div className="flex justify-center gap-x-2 text-justify w-full">
              <Checkbox id="terms" required className="mt-1" />
              <Label htmlFor="terms" className="text-xs font-normal">
                I understand that in order to maintain the security of this
                website we need an approval to your superior in your department
                for the account recovery. This is just to make sure that the
                owner of the account and the one who requested is the same.
              </Label>
            </div>
          </div>
          <DialogFooter>
            <AlertDialogDemo showAlertDialog={showAlertDialog} />
            {/* <Button type="submit">Reset Password</Button> */}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
