"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { updateNotification } from "@/endpoints";
import { revalidateTag } from "next/cache";

export default async function updateNotificationAction(id: string) {
  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const response = await updateNotification(token, id);

  console.log(`the response ::: ${response}`);

  if (response) {
    revalidateTag("get-notification-count");
    revalidateTag("get-notification");
  }
}
