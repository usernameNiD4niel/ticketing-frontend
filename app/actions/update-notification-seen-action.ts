"use server";

import { updateNotificationSeen } from "@/endpoints";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function updateNotificationSeenAction(
  operation: string,
  unseenNotifIds: string[]
) {
  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const isSuccess = await updateNotificationSeen(token, {
    operation,
    unseenNotifIds,
  });

  console.log(`is success ::: ${isSuccess}`);

  if (isSuccess) {
    revalidateTag("get-notification-count");
    revalidateTag("get-notification");
  }
  return isSuccess;
}
