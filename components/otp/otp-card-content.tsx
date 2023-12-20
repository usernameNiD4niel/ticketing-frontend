"use client";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "../ui/input";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { UserObject } from "@/constants/types";
import { createUserAction } from "@/app/actions";
import { Button } from "../ui/button";
import { LoadingButton } from "../utils/LoadingButton";
import CardOtpDialog from "./card-otp-dialog";
import resendOtpAction from "@/app/actions/resend-otp";
import { useToast } from "../ui/use-toast";
import Cookies from "js-cookie";

export default function OtpCardContent() {
  // const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [counter, setCounter] = useState(60);
  // const { getItem } = useStorage();
  const [otp, setOtp] = useState("");
  const { toast } = useToast();

  const user = useMemo(() => {
    const data = Cookies.get("user");

    if (data && data.length > 0) {
      const _user = JSON.parse(data) as UserObject;

      setOtp(_user.otp);
      console.log(`the _user ::: ${JSON.stringify(_user)}`);

      return _user;
    }

    router.back();
    return {} as UserObject;
  }, []);

  useEffect(() => {
    let countDownInterval: NodeJS.Timeout;

    if (counter > 1) {
      countDownInterval = setInterval(() => {
        if (counter > 1) {
          setCounter(counter - 1);
        } else {
          clearInterval(countDownInterval);
        }
      }, 1000);
    } else {
      setCounter(0);
    }
    return () => {
      clearInterval(countDownInterval);
    };
  }, [counter]);

  const handleFormAction = async (formData: FormData) => {
    const otp_ = formData.get("otp");

    console.log(`the otp_ ::: ${otp_}`);
    console.log(`the otp ::: ${otp}`);

    if (otp_?.toString() === otp.toString()) {
      setError("");
      setIsLoadingButton(true);

      formData.delete("otp"); // emptied the form data

      // append new data to form for creating new user
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("department", user.department);
      formData.append("password", user.password);

      //TODO: create  an action and push this form data
      const response = await createUserAction(formData);

      if (response.success) {
        Cookies.remove("user");
        toast({
          title: "Congratulations " + user.name,
          description: "You have successfully created your account!",
          duration: 3000,
        });
        router.push("http://10.10.1.120:3000");
      } else {
        setError(response.message);
        setIsLoadingButton(false);
      }
    } else {
      setError("The OTP you enter is incorrect, please try again");
      setIsLoadingButton(false);
    }
  };

  const handleBackButton = () => {
    router.back();
  };

  const handleResendOtp = async () => {
    setIsLoadingButton(true);
    const formData = new FormData();
    console.log(`resend to ${user.email}`);

    formData.append("email", user.email);

    const { message, otp, success } = await resendOtpAction(formData);

    if (success) {
      setCounter(60);
      setOtp(otp);
      toast({
        title: "Resend success",
        description: `We have re-send to your email ${user.email} the OTP`,
        duration: 5000,
      });
    } else {
      setCounter(60);
      toast({
        title: "Resend failed",
        description: `${message}`,
        duration: 5000,
      });
    }
    setIsLoadingButton(false);
  };

  return (
    <form action={handleFormAction}>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Input
              id="otp"
              placeholder="Example. 101519"
              type="password"
              name="otp"
            />
            {error && <span className="text-red-500 text-sm">{error}</span>}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-end w-full">
        <div className="w-full">
          {counter === 0 ? (
            <Button
              variant="customLink"
              className="p-0"
              type="button"
              onClick={handleResendOtp}
            >
              Didn&apos;t receive a code?
            </Button>
          ) : (
            <p className="text-xs">
              You can request a code in{" "}
              <span className="font-bold text-red-500">{counter}</span>
            </p>
          )}
        </div>
        <div className="flex items-center justify-end gap-x-2 my-5">
          <CardOtpDialog handleBackButton={handleBackButton} />
          {isLoadingButton ? (
            <LoadingButton isFullWidth={false} />
          ) : (
            <Button>Verify OTP</Button>
          )}
        </div>
      </CardFooter>
    </form>
  );
}
