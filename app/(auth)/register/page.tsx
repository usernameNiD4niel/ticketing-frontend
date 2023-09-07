"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/utils/ModeToggle";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { ComboboxDemo } from "@/components/utils/ComboBox";
import { useAuth } from "@/hooks/auth";
import Cookies from "js-cookie";
import { LoadingButton } from "@/components/utils/LoadingButton";
import { useRouter } from "next/navigation";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormRegisterSchema } from "@/constants/types";
import { validationSchema } from "./validation";

const Register = () => {
  const [department, setDepartment] = useState("");

  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useRouter();

  const { register: reg } = useAuth();

  const [departmentError, setDepartmentError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormRegisterSchema>({
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      navigate.push("/");
    }
    setIsLoading(false);
  }, []);

  const handleFormSubmit: SubmitHandler<FormRegisterSchema> = (data) => {
    console.log(data);

    const role = "unset";

    if (!department) {
      setDepartmentError("Department is required");
      return;
    }
    setIsLoadingButton(true);

    // await register({
    //   name,
    //   email,
    //   password,
    //   role,
    //   department,
    //   setError,
    //   setIsLoadingButton,
    // });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="w-full grid md:grid-cols-[1fr_50%] lg:grid-cols-[1fr_40%] xl:grid-cols-[1fr_30%] h-screen">
      <section className="hidden md:flex bg-black overflow-hidden relative">
        <Image
          alt="Construction Image"
          src="/signup.jpg"
          width={1350}
          height={400}
        />
        <div className="absolute inset-0 bg-black opacity-70 transition-opacity flex flex-col justify-end duration-300 ease-in hover:opacity-80 group p-4">
          <h1 className="font-bold text-5xl flex flex-col gap-y-4 text-white group-hover:text-7xl transition-all duration-300 ease-in">
            <span>WE MAKE</span> <span>EXCELLENCE A</span> <span>HABIT</span>
          </h1>
          <div className="w-full flex items-center">
            <p className="opacity-0 group-hover:opacity-100 text-white transition-opacity duration-700 ease-in-out max-w-xs">
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
      <section className="px-8 flex flex-col gap-y-7 mt-4 w-full">
        <div className="w-full flex items-center justify-end">
          <ModeToggle />
        </div>
        <Link href="/" className="w-full flex justify-center mb-5 mt-5">
          <Image
            alt="Devex Logo"
            src="./origdevexlogo.svg"
            width={120}
            height={120}
          />
        </Link>
        <div>
          <h1 className="text-4xl font-bold">Register to start</h1>
          <p className="font-light">
            Let&#39;s fix your day to day struggle and make your life easier
          </p>
        </div>
        <form
          className="flex flex-col gap-y-4 pb-4"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div className="flex flex-col gap-y-4">
            <Label htmlFor="fullName" className={styles.labels}>
              FullName
              <Input
                placeholder="Juan Tamad"
                type="text"
                id="fullName"
                {...register("name")}
              />
              {errors.name && (
                <span className="text-red-800 block text-sm">
                  {errors.name?.message}
                </span>
              )}
            </Label>
            <Label htmlFor="email" className={styles.labels}>
              Email
              <Input
                placeholder="juantamad@devexsolutions.com"
                type="email"
                id="email"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-red-800 block text-sm">
                  {errors.email?.message}
                </span>
              )}
            </Label>
            <Label className={styles.labels}>
              Department
              <ComboboxDemo
                department={department}
                setDepartment={setDepartment}
              />
              {departmentError && !department && (
                <span className="text-red-800 block text-sm">
                  {departmentError}
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
                <span className="text-red-800 block text-sm">
                  {errors.password?.message}
                </span>
              )}
            </Label>
            <Label htmlFor="confirmPassword" className={styles.labels}>
              Confirm Password
              <Input
                placeholder="Confirm your confirm password"
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
            <LoadingButton />
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
      </section>
    </main>
  );
};

/*
! VALIDATION
import { z, ZodError } from 'zod';

// Define the validation schema
const validationSchema = z.object({
  name: z
    .string()
    .min(3, 'Name should be at least 3 characters long'),
  email: z
    .string()
    .email('Email should be a valid email address')
    .min(1, 'Email is required field')
    .refine((value) => value.endsWith('devexsolutions.com') || value.endsWith('devexinc.com'), {
      message: 'Email should end with "devexsolutions.com" or "devexinc.com"',
    }),
  password: z
    .string()
    .min(6, 'Password should be at least 6 characters long')
    .refine((value) => /[A-Z]/.test(value) && /[a-z]/.test(value) && /\d/.test(value), {
      message: 'Password should contain at least one uppercase letter, one lowercase letter, and one digit',
    })
    .refine((value) => !/\s/.test(value), {
      message: 'Password should not contain spaces',
    }),
  confirmPassword: z
    .string()
    .min(1, 'Confirm Password is required'),
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords do not match',
});

// Validate a form data object
export const validateForm = (formData: any) => {
  try {
    validationSchema.parse(formData);
    return null; // No validation errors
  } catch (error) {
    if (error instanceof ZodError) {
      return error.format();
    }
    throw error;
  }
};

! check

import { z } from 'zod';

const validationSchema = z.object({
  // ... other fields ...
  password: z
    .string()
    .min(6, 'Password should be at least 6 characters long')
    .refine(
      (value) =>
        /[A-Z]/.test(value) && /[a-z]/.test(value) && /\d/.test(value),
      {
        message:
          'Password should contain at least one uppercase letter, one lowercase letter, and one digit',
      }
    )
    .refine((value) => !/\s/.test(value), {
      message: 'Password should not contain spaces',
    }),
  confirmPassword: z
    .string()
    .min(1, 'Confirm Password is required')
    .refine((value, data) => {
      // Check if password and confirmPassword fields match
      if (value !== data.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
});


! VALIDATION USAGE

import React, { useState } from 'react';

const MyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (validationErrors) {
      setErrors(validationErrors);
    } else {
      // Form data is valid, you can proceed with form submission
      // Clear any previous errors
      setErrors(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        {errors?.name && <div className="error">{errors.name}</div>}
      </div>
      <div>
        <label>Email:</label>
        <input type="text" name="email" value={formData.email} onChange={handleChange} />
        {errors?.email && <div className="error">{errors.email}</div>}
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
        {errors?.password && <div className="error">{errors.password}</div>}
      </div>
      <div>
        <label>Confirm Password:</label>
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
        {errors?.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;

*/

export default Register;
