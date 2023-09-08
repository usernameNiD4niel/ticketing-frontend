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

export function CardOtp() {
  const [otp, setOtp] = React.useState("");
  const [error, setError] = React.useState("");

  const [isLoadingButton, setIsLoadingButton] = React.useState(false);

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

    setTimeout(() => {
      setIsLoadingButton(false);
    }, 2000);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
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
              className="w-[140px] h-auto"
            />
          </div>
          <CardTitle>OTP has been send!</CardTitle>
          <CardDescription>
            Please your email, we have send to your email the 6 digit OTP code.
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
            <Button variant="link" type="button">
              Didn't receive a code?
            </Button>
          </div>
          {isLoadingButton ? (
            <LoadingButton isFullWidth={false} />
          ) : (
            <Button>Verify OTP</Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
