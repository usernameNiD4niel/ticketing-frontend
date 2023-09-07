import { validationSchema } from "@/app/(auth)/register/validation";
import { IconType } from "react-icons";
import { z } from "zod";

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
