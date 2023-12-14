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
  catalyst: string;
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
  closed_date: string;
  due_date: string;
  re_opened_date: string;
  location: string;
  contact: string;
};

export type AccountProps = {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  access_level: AccessLevelProps;
  department: string;
  created_time: string;
};

type AccessLevelProps = {
  id: number;
  it_access_level: string;
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
  created_time: string;
  updated_time: string;
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
  access_level: string;
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
  it_access_level: string;
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
  access_level: string;
  comment: string;
  name: string;
  department: string;
};

export type ExcelHeaders = {
  Champion: string;
  "Ticket Number": string;
  Requestor: string;
  "Date Created": string;
  Subject: string;
  Status: string;
};

export type StatusCount = {
  open: number;
  closed: number;
  expired: number;
  resolved: number;
  "re-opened": number;
};

export type CodeTableProps = {
  email: string;
  otp: string;
  created_at: string;
};

export type PaginatedType = {
  data: Payment[];
  next_page_url: number | null;
  prev_page_url: number | null;
};

export type AssignedPaginatedType = {
  data: AssignedTickets[];
  next_page_url: number | null;
  prev_page_url: number | null;
};

export type MenuTypes = {
  activeIcon: IconType;
  text: string;
  inactiveIcon: IconType;
  route: string;
};

export type ApplicationTypes = {
  id: number;
  applicant: string;
  position: string;
  notes: string;
  cv_resume: string | null;
  creator: string;
};

export type PostTicketTypes = {
  subject: string;
  description: string;
  location: string;
  contact: string;
  requestor?: string;
};

export type UserProps = {
  id: number;
  name: string;
  created_at: string;
  department: string;
  created_time: string;
};

export type DepartmentRolePatch = {
  role: string;
  user_ids: number[];
};

export type Login = {
  email: string;
  password: string;
};

export type LoginDataResponse = {
  token: string;
  name: string;
  it_access_level: string;
  hr_access_level: string;
  email: string;
};

export type ForgotPassword = {
  email: string;
  newPassword: string;
};

export type UserObject = {
  name: string;
  department: string;
  email: string;
  password: string;
  otp: string;
};

export type CreateUserType = {
  name: string;
  department: string;
  email: string;
  password: string;
};

export type AssignedTickets = {
  id: string;
  subject: string;
  priority: string;
  created_at: string;
  status: string;
};

export type Locations = {
  location: string;
  created_at: string;
  updated_at: string;
};

export type Notifications = {
  is_seen: boolean;
  notification_type: string;
  description: string;
  created_at: string;
  ticket_id: string;
};
