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
import { useState } from "react";
import { AlertDialogDemo } from "./AlertDialogDemo";
import { useAuth } from "@/hooks/auth";
import { MdMarkEmailUnread } from "react-icons/md";
import { LoadingButton } from "./LoadingButton";
import CustomAlert from "./CustomAlert";
export function DialogBox() {
  const [showAlertDialog, setShowAlertDialog] = useState<boolean>(false);

  const { forgotPassword, updatePassword } = useAuth();

  const [emailField, setEmailField] = useState("");
  const [newPasswordField, setNewPasswordField] = useState("");
  const [confirmPasswordField, setConfirmPasswordField] = useState("");

  const [isCorrectOtp, setIsCorrectOtp] = useState(false);

  const [generatedOtp, setGeneratedOtp] = useState("");

  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const [otp, setOtp] = useState("");

  // ? Errors State
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [isSuccessMessageShowing, setIsSuccessMessageShowing] = useState(false);

  const handleSendEmail = () => {
    console.log(emailField);

    if (!emailField) {
      setEmailError("Email is required");
      return;
    }

    if (
      !(
        emailField.endsWith("devexsolutions.com") ||
        emailField.endsWith("devexinc.com")
      )
    ) {
      setEmailError(
        "Supported emails only are devexsolutions.com and devexinc.com"
      );
      return;
    }

    setEmailError("");
    setIsLoadingButton(true);

    forgotPassword({
      setIsLoadingButton,
      setBackendValidationError: setEmailError,
      setGeneratedOtp,
      email: emailField,
    });
  };

  const handleSubmitOtp = () => {
    if (generatedOtp.toString() === otp) {
      setOtpError("");
      setIsSuccessMessageShowing(true);
      setIsCorrectOtp(true);
    } else {
      setIsCorrectOtp(false);
      setOtpError("Incorrect OTP code");
    }
  };

  const handleResetPassword = () => {
    console.log("handle reset invoked");

    if (!newPasswordField) {
      setPasswordError("Password is required");
      return;
    }

    if (!confirmPasswordField) {
      setConfirmPasswordError("Confirm Password is required");
      return;
    }

    if (newPasswordField !== confirmPasswordField) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    setShowAlertDialog(true);
  };

  const handleResetContinue = () => {
    setIsLoadingButton(true);
    updatePassword({
      setIsLoadingButton,
      setError: setConfirmPasswordError,
      handleSuccessForgotPassword,
      setGeneratedOtp,
      email: emailField,
      newPassword: newPasswordField,
    });
  };

  const handleSuccessForgotPassword = () => {
    localStorage.setItem("SUCCESS", "true");
    window.location.reload();
  };

  const handleOnChange = (
    setState: React.Dispatch<React.SetStateAction<string>>,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setState(value);
  };

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
          {isSuccessMessageShowing && <CustomAlert />}
          {!isCorrectOtp && (
            <div className="flex flex-col justify-center gap-y-3">
              <div>
                <div className="flex items-center gap-x-2">
                  <Input
                    id="email"
                    placeholder="juantamad@devexsolutions.com"
                    type="email"
                    className="col-span-3"
                    value={emailField}
                    onChange={(e) => handleOnChange(setEmailField, e)}
                  />
                  {!isLoadingButton ? (
                    <Button type="button" onClick={handleSendEmail}>
                      {/* <span className="hidden md:block text-xs">Get OTP</span> */}
                      <span className=" text-xl">
                        <MdMarkEmailUnread />
                      </span>
                    </Button>
                  ) : (
                    <LoadingButton isFullWidth={false} />
                  )}
                </div>
                {emailError && (
                  <p className="text-red-500 text-xs mt-2">{emailError}</p>
                )}
              </div>
              <Input
                placeholder="Enter your OTP here"
                type="password"
                className="col-span-3"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              {otpError && <p className="text-red-500 text-xs">{otpError}</p>}
              <div className="w-full flex justify-end mt-2">
                <Button
                  type="button"
                  className="w-full"
                  disabled={otp.length !== 6}
                  onClick={handleSubmitOtp}
                >
                  Submit
                </Button>
              </div>
            </div>
          )}
          {isCorrectOtp && (
            <>
              <div className="flex flex-col justify-center gap-y-2">
                <Label className="space-y-2">
                  <span>New Password</span>
                  <Input
                    id="newPassword"
                    placeholder="Enter your new password"
                    className="col-span-3"
                    type="password"
                    value={newPasswordField}
                    onChange={(e) => handleOnChange(setNewPasswordField, e)}
                  />
                  {passwordError && (
                    <p className="text-red-500 text-xs mt-2">{passwordError}</p>
                  )}
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
                    value={confirmPasswordField}
                    onChange={(e) => handleOnChange(setConfirmPasswordField, e)}
                  />
                  {confirmPasswordError && (
                    <p className="text-red-500 text-xs mt-2">
                      {confirmPasswordError}
                    </p>
                  )}
                </Label>
              </div>
            </>
          )}
        </div>
        <DialogFooter>
          {isCorrectOtp && (
            <AlertDialogDemo
              showAlertDialog={showAlertDialog}
              isLoadingButton={isLoadingButton}
              handleResetContinue={handleResetContinue}
              handleResetPassword={handleResetPassword}
            />
          )}
          {/* <Button type="submit">Reset Password</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
