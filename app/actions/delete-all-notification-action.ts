"use server";

import { deleteNotification } from "@/endpoints";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function deleteAllNotificationAction() {
  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const response = await deleteNotification(token);

  if (response.success) {
    revalidateTag("get-notification");
    revalidateTag("get-notification-count");
  }

  return response;
}
