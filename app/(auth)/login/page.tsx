"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/utils/ModeToggle";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";
import { Button } from "@/components/ui/button";
import { DialogBox } from "@/components/utils/DialogBox";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@/components/utils/LoadingButton";
import { validationSchema } from "./validation";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormLoginSchema } from "@/constants/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const navigate = useRouter();

  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isRegisterClick, setIsRegisterClick] = useState(false);

  const { login } = useAuth();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormLoginSchema>({
    resolver: zodResolver(validationSchema),
  });

  const handleChangingRoute = () => {
    setIsRegisterClick((prev) => !prev);
  };

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      navigate.push("/");
    }

    if (localStorage.getItem("SUCCESS")) {
      toast({
        title: "Password reset successfully",
        duration: 5000,
        description: "Try to use your new password by logging in here!",
      });
    }
    setIsLoading(false);

    return () => localStorage.clear();
  }, []);

  const handleSubmitForm: SubmitHandler<FormLoginSchema> = async (data) => {
    setIsLoadingButton(true);

    const email = data.email;
    const password = data.password;

    await login({ email, password, setError, setIsLoadingButton });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="w-full grid md:grid-cols-[50%_1fr] lg:grid-cols-[40%_1fr] xl:grid-cols-[30%_1fr] h-screen">
      <section className="px-8 flex flex-col gap-y-7 mt-4 w-full">
        <div className="w-full flex items-center justify-end">
          <ModeToggle />
        </div>
        <Link
          href="/"
          className="w-full flex justify-center mb-5 mt-5 lg:mt-24"
        >
          <Image
            alt="Devex Logo"
            src="./origdevexlogo.svg"
            width={90}
            height={90}
            className="w-[90px] h-[90px]"
          />
        </Link>
        <div>
          <h1 className="text-4xl font-bold">Welcome back!</h1>
          <p className="font-light">Login to continue your progress with us</p>
        </div>
        <form
          className="flex flex-col gap-y-6"
          onSubmit={handleSubmit(handleSubmitForm)}
        >
          {error && <p className="text-red-400 text-sm font-bold">{error}</p>}
          <Label htmlFor="email" className={styles.labels}>
            Email
            <Input
              placeholder="juantamad@devexsolutions.com"
              type="email"
              id="email"
              autoFocus={true}
              {...register("email")}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </Label>
          <Label htmlFor="password" className={styles.labels}>
            Password
            <Input
              placeholder="Enter your password"
              id="password"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </Label>
          <div className="flex text-sm justify-end items-center">
            <DialogBox />
          </div>
          {isLoadingButton ? (
            <LoadingButton isFullWidth={true} />
          ) : (
            <Button disabled={isSubmitting}>LOGIN</Button>
          )}
          <Label className="text-sm md:text-base font-normal w-full text-center">
            Don&#39;t have an account yet?{" "}
            {isRegisterClick ? (
              <span className="text-[#0B64B9]">Navigating...</span>
            ) : (
              <Link
                href="/register"
                className="font-bold text-[#0B64B9]"
                onClick={handleChangingRoute}
              >
                Register
              </Link>
            )}
          </Label>
        </form>
      </section>
      <section className="hidden md:flex bg-black overflow-hidden relative">
        <Image
          alt="Construction Image"
          src="/house.jpg"
          width={1350}
          height={400}
        />
        <div className="absolute inset-0 bg-black opacity-60 transition-opacity duration-300 ease-in hover:opacity-70 group p-4">
          <h1 className="font-bold text-5xl text-end flex flex-col gap-y-4 text-white group-hover:text-7xl transition-all duration-300 ease-in">
            <span>WE MAKE</span> <span>EXCELLENCE A</span> <span>HABIT</span>
          </h1>
          <div className="w-full flex justify-end items-center">
            <p className="opacity-0 group-hover:opacity-100 text-white transition-opacity duration-700 ease-in-out text-end max-w-xs">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Recusandae, temporibus. Quidem quisquam, minima, ex ipsam totam
              unde sapiente, architecto fugiat in exercitationem ipsum dolore!
              Id, fugiat! Expedita inventore unde voluptatum tenetur amet
              laborum eligendi repudiandae exercitationem similique earum?
              Placeat molestias est voluptas. Tenetur eveniet eum, officiis quae
              sed inventore adipisci?
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
