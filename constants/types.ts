import { IconType } from "react-icons";

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
