"use server";

import { updateSpecificUserStatus } from "@/endpoints";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function updateSpecificUserStatusAction(
  id: string,
  status: string
) {
  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const response = await updateSpecificUserStatus(id, status, token);

  if (response.success) {
    revalidateTag(`accounts-manage-user-${id}`);
  }

  return response;
}
