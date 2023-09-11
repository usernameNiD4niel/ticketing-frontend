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
import { useEffect, useRef, useState } from "react";
import { AlertDialogDemo } from "./AlertDialogDemo";
import { useAuth } from "@/hooks/auth";
import { MdMarkEmailUnread } from "react-icons/md";
import { LoadingButton } from "./LoadingButton";
import { ToastMessage } from "./ToastMessage";
import { Toaster } from "../ui/toaster";
import { useToast } from "../ui/use-toast";

type ErrorsProps = {
  email: string;
  password: string;
  confirmPassword: string;
  otp: string;
};

export function DialogBox() {
  const [showAlertDialog, setShowAlertDialog] = useState<boolean>(false);

  const { forgotPassword } = useAuth();

  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");

  const [isOtpIsSent, setIsOtpIsSent] = useState(false);
  const [isCorrectOtp, setIsCorrectOtp] = useState(false);

  const [generatedOtp, setGeneratedOtp] = useState("");

  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const [otpGenerated, setOtpGenerated] = useState("");

  const [otp, setOtp] = useState("");

  // ? Errors State
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const emailRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleSubmit = () => {
    setShowAlertDialog(true);
  };

  useEffect(() => {
    if (generatedOtp) {
      toast({
        title: `The OTP has been sent to ${email}`,
        description: "Please check your email to see the 6 digit code",
      });
    }
  }, [generatedOtp]);

  const handleSendEmail = () => {
    const email = emailRef.current?.value;

    if (!email) {
      setEmailError("Email is required");
      return;
    }

    if (
      !(
        email?.endsWith("devexsolutions.com") || email?.endsWith("devexinc.com")
      )
    ) {
      setEmailError(
        "Supported emails only are devexsolutions.com and devexinc.com"
      );
      return;
    }

    setIsLoadingButton(true);

    forgotPassword({
      setIsLoadingButton,
      setBackendValidationError: setEmailError,
      setGeneratedOtp,
      email,
    });
  };

  // ! CREATE VALIDATION HERE, WE CAN USE ZOD VALIDATION

  const handleSubmitOtp = () => {
    console.log(generatedOtp === otp, "equal ba?");
    console.log(typeof generatedOtp, "typeof generated otp");
    console.log(typeof otp, "typeof otp");

    if (generatedOtp.toString() === otp) {
      setOtpError("");
      setIsCorrectOtp(true);
      toast({
        title: "Successfully Reset Password",
        description: "You can now login and use your updated password",
      });
    } else {
      setIsCorrectOtp(false);
      setOtpError("Incorrect OTP code");
    }
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
              Forgot your password?
            </DialogTitle>
            <DialogDescription>
              Don&#39;t worry we&#39;ll get your account in just a simple steps
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 w-full">
            {!isCorrectOtp && (
              <div className="flex flex-col justify-center gap-y-3">
                <div>
                  <div className="flex items-center gap-x-2">
                    <Input
                      id="email"
                      placeholder="juantamad@devexsolutions.com"
                      type="email"
                      className="col-span-3"
                      required
                      ref={emailRef}
                    />
                    {!isLoadingButton ? (
                      <Button type="button" onClick={handleSendEmail}>
                        <span className="hidden md:block">Get OTP</span>
                        <span className="md:hidden text-xl">
                          <MdMarkEmailUnread />
                        </span>
                      </Button>
                    ) : (
                      <LoadingButton isFullWidth={false} />
                    )}
                  </div>
                  {emailError && (
                    <p className="text-red-500 text-xs">{emailError}</p>
                  )}
                </div>
                <Input
                  placeholder="Enter your OTP here"
                  type="password"
                  className="col-span-3"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
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
                      required
                      ref={newPasswordRef}
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
                      ref={confirmPasswordRef}
                    />
                  </Label>
                </div>
                <div className="flex justify-center gap-x-2 text-justify w-full">
                  <Checkbox id="terms" required className="mt-1" />
                  <Label htmlFor="terms" className="text-xs font-normal">
                    I understand that in order to maintain the security of this
                    website we need an approval to your superior in your
                    department for the account recovery. This is just to make
                    sure that the owner of the account and the one who requested
                    is the same.
                  </Label>
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            {isCorrectOtp && (
              <AlertDialogDemo showAlertDialog={showAlertDialog} />
            )}
            {/* <Button type="submit">Reset Password</Button> */}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
