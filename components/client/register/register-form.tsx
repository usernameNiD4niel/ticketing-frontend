"use client";
import { validationSchema } from "@/app/(auth)/register/validation";
import { Button } from "@/components/ui/button";
import styles from "@/app/(auth)/register/styles.module.css";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ComboboxDemo } from "@/components/utils/ComboBox";
import { LoadingButton } from "@/components/utils/LoadingButton";
import { FormRegisterSchema, UserObject } from "@/constants/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { getOtpGenerated } from "@/endpoints";
import { useToast } from "@/components/ui/use-toast";
import Cookies from "js-cookie";

export default function RegisterForm() {
  const [department, setDepartment] = useState("");

  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [departmentError, setDepartmentError] = useState("");

  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormRegisterSchema>({
    resolver: zodResolver(validationSchema),
  });

  const createRequest: SubmitHandler<FormRegisterSchema> = async (data) => {
    setIsLoadingButton(true);

    const { message, otp, success } = await getOtpGenerated(data.email);

    if (success) {
      toast({
        title: "OTP Generation Success",
        description: message,
      });

      const userObject: UserObject = {
        name: data.name,
        department,
        email: data.email,
        password: data.password,
        otp,
      };

      Cookies.set("user", JSON.stringify(userObject));

      // sessionStorage.setItem("user", JSON.stringify(userObject));

      router.push(`/register/otp`);
    } else {
      toast({
        title: "OTP Generation Failed",
        description: message,
      });

      setIsLoadingButton(false);
    }
  };

  const handleFormSubmit: SubmitHandler<FormRegisterSchema> = (data) => {
    if (!department) {
      setDepartmentError("Department is required");
      return;
    }

    createRequest(data);
  };

  return (
    <form
      className="flex flex-col gap-y-4 pb-4"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className="flex flex-col gap-y-3">
        <Label htmlFor="fullName" className={styles.labels}>
          FullName
          <Input type="text" id="fullName" {...register("name")} />
          {errors.name && (
            <span className="text-red-800 block text-sm">
              {errors.name?.message}
            </span>
          )}
        </Label>
        <Label htmlFor="email" className={styles.labels}>
          Email
          <Input type="email" id="email" {...register("email")} />
          {errors.email && (
            <span className="text-red-800 block text-sm">
              {errors.email?.message}
            </span>
          )}
        </Label>
        <Label className={styles.labels}>
          Department
          <ComboboxDemo department={department} setDepartment={setDepartment} />
          {departmentError && !department && (
            <span className="text-red-800 block text-sm">
              {departmentError}
            </span>
          )}
        </Label>
        <Label htmlFor="password" className={styles.labels}>
          Password
          <Input id="password" type="password" {...register("password")} />
          {errors.password && (
            <span className="text-red-800 block text-sm">
              {errors.password?.message}
            </span>
          )}
        </Label>
        <Label htmlFor="confirmPassword" className={styles.labels}>
          Confirm Password
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span className="text-red-800 block text-sm">
              {errors.confirmPassword?.message}
            </span>
          )}
        </Label>
      </div>
      {isLoadingButton ? (
        <LoadingButton isFullWidth={true} />
      ) : (
        <Button disabled={isSubmitting}>SIGN UP</Button>
      )}
      <Label className="text-sm md:text-base font-normal w-full text-center">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-[#0B64B9]">
          Login
        </Link>
      </Label>
    </form>
  );
}
