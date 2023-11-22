"use server";

import { DepartmentRolePatch } from "@/constants/types";
import { patchPendingDepartmentRole } from "@/endpoints";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export default async function updateDepartmentRole(
  id: number[],
  formData: FormData
) {
  const token = cookies().get("token")?.value;

  const data: DepartmentRolePatch = {
    role: formData.get("role")?.toString()!,
    user_ids: id,
  };

  const request = await patchPendingDepartmentRole(token!, data);

  revalidateTag("users-pending-department-role");
  return request;
}
