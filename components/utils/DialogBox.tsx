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
import { useState } from "react";
import { AlertDialogDemo } from "./AlertDialogDemo";
import CustomAlert from "./CustomAlert";
import OtpForm from "../client/login/otp-form";
import ChangePasswordForm from "../client/login/change-password-form";

export function DialogBox() {
  const [isCorrectOtp, setIsCorrectOtp] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">Forgot Password?</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Forgot your password?</DialogTitle>
          <DialogDescription>
            Don&#39;t worry we&#39;ll get your account in just a simple steps.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 w-full">
          {isCorrectOtp && (
            <CustomAlert
              success={true}
              description="You have entered a correct OTP code"
              title="Validation Success"
              key={"DialogBoxCustomAlert"}
            />
          )}
          {/* {!isCorrectOtp && <OtpForm setIsCorrectOtp={setIsCorrectOtp} />} */}
          {isCorrectOtp ? (
            <ChangePasswordForm />
          ) : (
            <OtpForm setIsCorrectOtp={setIsCorrectOtp} />
          )}
        </div>
        <DialogFooter>
          <div className="w-full flex flex-col justify-end gap-3">
            {isCorrectOtp && <AlertDialogDemo />}
          </div>
          {/* <Button type="submit">Reset Password</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
