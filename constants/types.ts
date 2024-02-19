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
  description: string;
  assigned_to: string;
  name: string;
  is_ticket_owner: boolean;
  is_ticket_champion: boolean;
  closed_date: string;
  due_date: string;
  cancelled_date: string;
  location: string;
  contact: string;
  ticket_type?: string;
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
  // * comment
  name?: string;
  // access_level?: string;
  comment?: string;
  department?: string;
  user_joined_on?: string;

  created_time: string;
  created_at: string;
  is_comment: boolean;
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
  updated_at: string;
  subject: string;
  assigned_to: string;
  status: "open" | "close" | "resolved" | "expired" | "re-opened";
};

export type CommentsProps = {
  comments: CommentInfoProps[];
  message?: string;
};

export type CommentInfoProps = {
  //* ticket activity
  id?: string;
  ticket_id?: string;
  activity_type?: string;
  user_id?: string;
  details?: string;
  updated_at?: string;
  updated_time?: string;

  // * comment
  name?: string;
  access_level?: string;
  comment?: string;
  department?: string;
  user_joined_on?: string;

  created_time: string;
  created_at: string;
  is_comment: boolean;
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
  cancelled: number;
};

export type CodeTableProps = {
  email: string;
  otp: string;
  created_at: string;
};

export type PaginatedType = {
  data: Payment[];
  next_page_url: string | null;
  prev_page_url: string | null;
  currentPage: number;
  pageCount: number;
};

export type AssignedPaginatedType = {
  data: AssignedTickets[];
  next_page_url: string | null;
  prev_page_url: string | null;
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
  ticket_type?: string;
  assign_to?: string;
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
  users_ids: number[];
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
  system_status: string;
  it_status: string;
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
  id: string;
  is_seen: boolean;
  notification_type: string;
  description: string;
  created_at: string;
  ticket_id: string;
};

export type UpdateNotification = {
  operation: string;
  unseenNotifIds: string[];
};

export type ChampionCarouselItem = {
  champion_name: string;
  date_covered: string;
  no_of_tickets: string;
  closed: string;
  open: string;
  re_opened: string;
  resolution_rate: string;
};

export type ChampionCarousel = {
  id: string;
  champion_name: string;
  resolution_rate: string;
};

export type FilterProgress = {
  ticket_count: number;
  closed_ticket_count: number;
  open_ticket_count: number;
  cancelled_ticket_count: number;
  resolution_rate: number;
};

export type TicketTypeColumns = {
  ticket_type: string;
  duration: string;
  created_at: string;
  updated_at: string;
};

export type TicketType = {
  duration: string;
  priority: string;
};

export type ManageUser = {
  id: string;
  name: string;
  department: string;
  joined_on: string;
  access_level: string;
  system_status: string;
  it_status: string;
};

export type ManageUserProps = {
  id: string;
  name: string;
  email: string;
  created_at: string;
  department: string;
  role: string;
  account_status: string; // * This is matic
  system_status: string; // * active or deactivate in the entire system
  it_status: string; // * active or deactivate in the entire it ticketing system
};

export type UpdateUserType = {
  department: string | undefined;
  role: string | undefined;
  email: string | undefined;
};
