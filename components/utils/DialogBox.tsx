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
import { useRef, useState } from "react";
import { AlertDialogDemo } from "./AlertDialogDemo";
import { useAuth } from "@/hooks/auth";

export function DialogBox() {
  const [showAlertDialog, setShowAlertDialog] = useState<boolean>(false);

  const { forgotPassword } = useAuth();

  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    setShowAlertDialog(true);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">Forgot Password?</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-2xl">
              You forgot your password?
            </DialogTitle>
            <DialogDescription>
              Don&#39;t worry we&#39;ll get your account in just a simple steps
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 w-full">
            <div className="flex justify-center flex-col gap-y-2">
              <Label className="space-y-2">
                <span>Fullname</span>
                <Input
                  id="fullName"
                  placeholder="Juan Tamad"
                  className="col-span-3"
                  required
                />
              </Label>
            </div>
            <div className="flex flex-col justify-center gap-y-2">
              <Label className="flex gap-y-2 flex-col">
                Department
                <ComboboxDemo
                  department={department}
                  setDepartment={setDepartment}
                />
              </Label>
            </div>
            <div className="flex flex-col justify-center gap-y-2">
              <Label className="space-y-2">
                <span>Email</span>
                <Input
                  id="email"
                  placeholder="juantamad@devexsolutions.com"
                  type="email"
                  className="col-span-3"
                  required
                />
              </Label>
            </div>
            <div className="flex flex-col justify-center gap-y-2">
              <Label className="space-y-2">
                <span>New Password</span>
                <Input
                  id="newPassword"
                  placeholder="Enter your new password"
                  className="col-span-3"
                  type="password"
                  required
                />
              </Label>
            </div>
            <div className="flex flex-col justify-center gap-y-2">
              <Label className="space-y-2">
                <span>Confirm Password</span>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Re-type your new password"
                  className="col-span-3"
                  required
                />
              </Label>
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
