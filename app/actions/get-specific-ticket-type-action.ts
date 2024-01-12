"use server";

import { getSpecificTicketType } from "@/endpoints";
import { cookies } from "next/headers";

export default async function getSpecificTicketTypeAction(ticketType: string) {
  const token = cookies().get("token")?.value;

  const response = await getSpecificTicketType(token!, ticketType);

  return response;
}
