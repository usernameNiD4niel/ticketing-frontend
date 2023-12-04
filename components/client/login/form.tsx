"use client";
import styles from "../../../app/(auth)/login/styles.module.css";
import { validationSchema } from "@/app/(auth)/login/validation";
import login from "@/app/actions/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogBox } from "@/components/utils/DialogBox";
import { LoadingButton } from "@/components/utils/LoadingButton";
import { FormLoginSchema } from "@/constants/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function LoginForm() {
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormLoginSchema>({
    resolver: zodResolver(validationSchema),
  });

  const handleSubmitForm: SubmitHandler<FormLoginSchema> = async (data) => {
    setIsValid(true);

    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    const isAuthorized = await login(formData);

    if (isAuthorized.success) {
      setError("");
      router.push("/");
    } else {
      setError(isAuthorized.message);
      setIsValid(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-y-6"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      {error && <p className="text-red-400 text-sm font-bold">{error}</p>}
      <Label htmlFor="email" className={styles.labels}>
        Email
        <Input
          type="email"
          id="email"
          autoFocus={true}
          {...register("email")}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </Label>
      <Label htmlFor="password" className={styles.labels}>
        Password
        <Input id="password" type="password" {...register("password")} />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
      </Label>
      <div className="flex text-sm justify-end items-center">
        <DialogBox />
      </div>
      {isValid ? (
        <LoadingButton isFullWidth={true} />
      ) : (
        <Button disabled={isSubmitting}>LOGIN</Button>
      )}
      <Label className="text-sm md:text-base font-normal w-full text-center">
        Don&#39;t have an account yet?{" "}
        <Link href="/register" className="font-bold text-[#0B64B9]">
          Register
        </Link>
      </Label>
    </form>
  );
}
