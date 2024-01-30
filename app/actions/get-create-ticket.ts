"use server";

import { getTicketType } from "@/endpoints";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function getCreateTicket() {
  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const response = await getTicketType(token, true);

  return response as string[];
}
