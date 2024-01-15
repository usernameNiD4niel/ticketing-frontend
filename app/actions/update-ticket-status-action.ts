"use server";

import { updateTicketStatus } from "@/endpoints";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function updateTicketStatusAction(
  status: string,
  id: number
) {
  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const response = await updateTicketStatus(token, status, id);

  if (response.success) {
    // TODO revalidate the tag of ticket
    revalidateTag(`it-tickets-item-${id}`);
  }

  return response;
}
