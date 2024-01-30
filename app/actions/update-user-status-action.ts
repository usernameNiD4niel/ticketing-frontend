"use server";

import updateUserStatus from "@/endpoints/updateUserStatus";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function updateUserStatusAction(
  userIds: string[],
  status: string,
  column: string
) {
  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const response = await updateUserStatus(
    token,
    userIds,
    status.toLowerCase(),
    column
  );

  if (response.success) {
    revalidateTag("get-table-data-manage-user");
  }

  return response;
}
