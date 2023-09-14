"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { otpValidationSchema } from "@/app/(auth)/register/otp/validation";
import { LoadingButton } from "../utils/LoadingButton";
import { useAuth } from "@/hooks/auth";
import { UserDataProps } from "@/constants/types";
import { useRouter } from "next/navigation";

type CardOtpProps = {
  emailOtp: string;
  reset: () => void;
  userData: UserDataProps;
};

const CardOtp: React.FC<CardOtpProps> = ({ emailOtp, reset, userData }) => {
  const [otp, setOtp] = React.useState("");
  const [error, setError] = React.useState("");
  const router = useRouter();

  const [counter, setCounter] = React.useState(60);

  const { register, reGenerateOtp } = useAuth();

  const [resendOtp, setResendOtp] = React.useState("");

  const [isLoadingButton, setIsLoadingButton] = React.useState(false);

  React.useEffect(() => {
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

  const handleFormValidation = (event: React.FormEvent) => {
    event.preventDefault();

    const validationResult = otpValidationSchema.safeParse(otp);

    if (validationResult.success) {
      setError("");
    } else {
      console.log(validationResult.error.errors[0].message);
      setError(validationResult.error.errors[0].message);
      return;
    }

    setIsLoadingButton(true);

    console.log("email otp: ", typeof emailOtp.toString());
    console.log("user otp: ", typeof otp);
    console.log("is equal: ", otp === emailOtp);

    if (emailOtp.toString() !== otp) {
      setError("OTP entered is incorrect!");
      setIsLoadingButton(false);
    } else {
      const { email, name, password, role, department } = userData;
      register({
        setBackendValidationError: setError,
        setIsLoadingButton,
        reset,
        email,
        name,
        password,
        role,
        department,
      });
      console.log("malinis");

      console.log("after reset: ", userData + " : " + email);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleBackButton = () => {
    router.push("/register");
  };

  const handleResendCode = async () => {
    const { email } = userData;
    setCounter(60);

    await reGenerateOtp({
      setBackendValidationError: setError,
      setIsLoadingButton,
      setResendOtp,
      email,
    });
  };

  return (
    <Card className="w-full md:w-[450px] mx-2 md:mx-0 md:h-[50%] px-2 py-4">
      <form onSubmit={handleFormValidation}>
        <CardHeader>
          <div className="w-full flex items-center justify-center mb-7 mt-4">
            <Image
              src="/origdevexlogo.svg"
              alt="Devex Inc logo"
              width={90}
              height={90}
              className="w-[90] md:w-[140px] h-auto"
            />
          </div>
          <CardTitle>OTP has been send!</CardTitle>
          <CardDescription>
            Please check <span className="font-bold">{userData.email}</span>{" "}
            email we have sent you the OTP code. If you didn&apos;t receive a
            code you can click the button &quot;Didn&apos;t receive a
            code?&quot; or restart your Thunderbird
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Input
                id="name"
                placeholder="Example. 101519"
                type="password"
                value={otp}
                onChange={handleOnChange}
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
                onClick={handleResendCode}
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
            <Button variant="ghost" type="button" onClick={handleBackButton}>
              Back
            </Button>
            {isLoadingButton ? (
              <LoadingButton isFullWidth={false} />
            ) : (
              <Button>Verify OTP</Button>
            )}
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CardOtp;
