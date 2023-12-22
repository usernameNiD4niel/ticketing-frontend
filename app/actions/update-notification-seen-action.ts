"use server";

import { updateNotificationSeen } from "@/endpoints";
import { revalidatePath, revalidateTag } from "next/cache";
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

  console.log(`is success ::: ${JSON.stringify(unseenNotifIds, null, 2)}`);

  if (isSuccess) {
    revalidateTag("get-notification");
    revalidatePath("/department/it/notification");
    revalidateTag("get-notification-count");
  }
  return isSuccess;
}
