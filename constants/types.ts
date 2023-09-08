import { validationSchema } from "@/app/(auth)/register/validation";
import { validationSchema as loginValidaiton } from "@/app/(auth)/login/validation";
import { IconType } from "react-icons";
import { z } from "zod";
import { otpValidationSchema } from "@/app/(auth)/register/otp/validation";

export type DepartmentProps = {
  url: string;
  label: string;
  value: string;
  icon: IconType;
};

export type LoginResponseProps = {
  message?: string;
  error?: string;
};

export type LoginProps = {
  email: string;
  password: string;
  csrfToken?: string;
};

export type FormRegisterSchema = z.infer<typeof validationSchema>;
export type FormLoginSchema = z.infer<typeof loginValidaiton>;
export type FormOtpSchema = z.infer<typeof otpValidationSchema>;
