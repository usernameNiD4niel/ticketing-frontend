import { validationSchema } from "@/app/(auth)/register/validation";
import { validationSchema as loginValidaiton } from "@/app/(auth)/login/validation";
import { IconType } from "react-icons";
import { z } from "zod";
import { otpValidationSchema } from "@/app/(auth)/register/otp/validation";
import { AvailableTabs } from "./enums";
import { updatePasswordSchema } from "@/app/department/it/accounts/validation";

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
export type FormUpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;
export type FormLoginSchema = z.infer<typeof loginValidaiton>;
export type FormOtpSchema = z.infer<typeof otpValidationSchema>;

export type UserDataProps = {
  role: string;
  name: string;
  password: string;
  otp: string;
  email: string;
  department: string;
};

export type TabActive = {
  activeTab: AvailableTabs;
};

export type FeedTicketProps = {
  id: number;
  status: string;
  subject: string;
  created_at: string;
  priority: string;
  department: string;
  updated_at: string;
  resolved_date: string;
  description: string;
  assigned_to: string;
  name: string;
  is_ticket_owner: boolean;
};

export type AccountProps = {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  role: string;
  department: string;
  created_time: string;
};

export type ProfileTabProps = {
  displayText: string;
  isActive: boolean;
  route: string;
  onClick: () => void;
};

export type Activity = {
  id: number;
  ticket_id: number;
  activity_type: string;
  user_id: number;
  details: string;
  created_at: string;
  updated_at: string;
};

export type ActivitiesProps = {
  activities: Activity[];
};

export type TicketContent = {
  id: number;
  title: string;
  description: string;
  created_date: string;
  created_time: string;
};

export type CommentProps = {
  role: string;
  name: string;
  comment: string;
  date_commented: string;
  time_commented: string;
  department: string;
};

export type UsersType = {
  user: User;
};

type User = {
  id: number;
  email: string;
  name: string;
  created_at: string;
  updated_at: string;
  role: string;
  department: string;
};

export type Payment = {
  id: string;
  name: string;
  created_at: string;
  subject: string;
  assigned_to: string;
  status: "open" | "close" | "resolved" | "expired" | "re-opened";
};

export type CommentsProps = {
  comments: CommentInfoProps[];
  message?: string;
};

export type CommentInfoProps = {
  date_commented: string;
  time_commented: string;
  role: string;
  comment: string;
  name: string;
  department: string;
};

export type ExcelHeaders = {
  /**
   * responseData.push({
      'Champion': d.assigned_to,
      'Ticket Number': d.id,
      'Requestor': d.name,
      'Date Created': d.created_at,
      'Subject': d.subject,
      'Status': d.status
    })
   */
  Champion: string;
  "Ticket Number": string;
  Requestor: string;
  "Date Created": string;
  Subject: string;
  Status: string;
};
