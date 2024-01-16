"use server";

import { deleteUser } from "@/endpoints";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function deleteUserAction(names: string[]) {
  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const response = await deleteUser(names, token);

  if (response.success) {
    revalidateTag("users-pending-department-role");
  }

  return response;
}
