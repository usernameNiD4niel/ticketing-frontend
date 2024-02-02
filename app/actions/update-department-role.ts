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
    role: formData.get("role")?.toString()!.toUpperCase()!,
    users_ids: id,
  };

  console.log(`dataaa ::: ${JSON.stringify(data, null, 2)}`);
  const request = await patchPendingDepartmentRole(token!, data);

  revalidateTag("users-pending-department-role");
  return request;
}
