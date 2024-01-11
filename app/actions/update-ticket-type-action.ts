"use server";

import { updateTicketType } from "@/endpoints";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function updateTicketTypeAction(formData: FormData) {
  const ticketType = formData.get("ticketType")?.toString();
  const ticketType_ = formData.get("ticketType_")?.toString();
  const type = formData.get("type")?.toString();
  const howLong = formData.get("howLong")?.toString();

  if (ticketType && type && howLong && ticketType_) {
    const token = cookies().get("token")?.value;

    if (!token) {
      redirect("/login");
    }
    const response = await updateTicketType(token, ticketType_, {
      howLong,
      ticket_type: ticketType,
      type,
    });

    if (response.success) {
      revalidateTag("get-ticket-type");
    }

    return response;
  }

  return {
    success: false,
    message: "Cannot update the " + ticketType + " please try again",
  };
}
