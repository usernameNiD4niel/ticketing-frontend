"use server";

import { getNotificationFilter } from "@/endpoints";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function notificationFilterAction(
  operation: "filter today" | "filter this week" | "filter this month"
) {
  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const response = await getNotificationFilter(token, operation);
  return response;
}
