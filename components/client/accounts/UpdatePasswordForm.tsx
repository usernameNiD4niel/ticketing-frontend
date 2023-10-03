"use client";
import { updatePasswordSchema } from "@/app/department/it/accounts/validation";
import DisplayError from "@/components/server/accounts/DisplayError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingButton } from "@/components/utils/LoadingButton";
import { FormUpdatePasswordSchema } from "@/constants/types";
import { useAuth } from "@/hooks/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type UpdatePasswordFormProps = {
  token: string;
  email: string;
};

const UpdatePasswordForm: React.FC<UpdatePasswordFormProps> = ({
  token,
  email,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormUpdatePasswordSchema>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const router = useRouter();

  const [error, setError] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const { changePassword } = useAuth();
  if (!token || !email) {
    router.push("/login");
  }

  const handleUpdatePassword: SubmitHandler<FormUpdatePasswordSchema> = async (
    data,
    event
  ) => {
    if (event) {
      setIsUpdating(true);
      changePassword({
        email,
        newPassword: data.newPassword,
        setError,
        setIsUpdating,
        currentPassword: data.currentPassword,
        token,
        event,
      });
    } else {
      setError("Please refresh the page to refetch the resources");
    }
  };

  return (
    <form
      className="flex gap-y-4 flex-col w-full md:w-[70%]"
      onSubmit={handleSubmit(handleUpdatePassword)}
    >
      <h3 className="font-bold text-lg">Change Password</h3>
      <Label className="space-y-2">
        <span>Current Password</span>
        <Input
          placeholder="Enter your current password here"
          type="password"
          autoFocus
          {...register("currentPassword")}
        />
        {errors.currentPassword && (
          <DisplayError errorMessage={`${errors.currentPassword?.message}`} />
        )}
      </Label>
      <Label className="space-y-2">
        <span>New Password</span>
        <Input
          placeholder="Enter your new password here"
          type="password"
          {...register("newPassword")}
        />
        {errors.newPassword && (
          <DisplayError errorMessage={`${errors.newPassword?.message}`} />
        )}
      </Label>
      <Label className="space-y-2">
        <span>Confirm Password</span>
        <Input
          placeholder="Confirm your new password"
          type="password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <DisplayError errorMessage={`${errors.confirmPassword?.message}`} />
        )}
      </Label>
      {error && <DisplayError errorMessage={error} />}
      <div className="w-full flex justify-end items-center">
        {isSubmitting || isUpdating ? (
          <LoadingButton isFullWidth={false} />
        ) : (
          <Button>Submit</Button>
        )}
      </div>
    </form>
  );
};

export default UpdatePasswordForm;
