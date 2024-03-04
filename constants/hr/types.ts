import { IconType } from "react-icons";

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
  created_at: string;
  updated_at: string;
};

export type PostApplicationTypes = {
  applicant: string;
  position: string;
  notes: string | null;
  cv_resume: string | null;
};

export type SlugTypes = {
  slug: string[];
};

export type SearchParamsProps = {
  id: string;
  data: string;
  created_at: string;
};

export type UserRole = {
  role: string;
  id: string[];
};

export type FetchingUsersRole = {
  id: number;
  name: string;
  department: string;
  created_at: string;
};

export type RequestedManpower = {
  id: string;
  created_at: string;
  updated_at: string;
  requisitioner: string;
  position: string;
  department: string;
  position_required: string | null;
  project_or_location: string;
  position_level: string | null;
  no_employees_required: string;
  justification: string | null;
  assign_to: string | null;
  status: string;
  employment_status: EmploymentStatus;
  job_specification: JobSpecification;
};

type EmploymentStatus = {
  status: string;
  project_duration_from: string | null;
  project_duration_to: string | null;
};

type JobSpecification = {
  age: string;
  work_experience: string | null;
  gender: string;
  education: string;
  certification_training: string | null;
  courses_degree: string | null;
  device: string | null;
  special_skills_and_qualifications: string | null;
};

export type RequestedManpowerHR = {
  id: string;
  department: string;
  created_at: string;
  position: string;
  employment_status: string;
  no_employees_required: string;
};

export type ChampionsResponse = {
  id: string;
  champion: string;
};

export type StatusAndAssignTo = {
  status: string | null;
  assign_to: string | null;
};

export type UnassignedCount = {
  r: number;
  d: number;
};

export type RecentApplication = {
  id: string;
  created_at: string;
  applicant: string;
  position: string;
};

export type StatusCount = {
  sourcing: number;
  for_interview: number;
  hire_cancel: number;
};

export type RecentRequestedManpower = {
  id: string;
  department: string;
  requisitioner: string;
  created_at: string;
  no_employees_required: string;
};

export type Comment = {
  id: string;
  name: string;
  comment: string;
  created_at: string;
};

export type HrActivity = {
  id: string;
  activity: string;
  created_at: string;
};

export type FeedData = {
  id: string;
  requisitioner: string;
  department: string;
  position: string;
  assign_to: string;
};

export type RequestedManpowerZip = {
  data: FeedData[];
  next_page_url: number | null;
};
