"use server";
import { PostTicketTypes } from "@/constants/types";
import { postTroubleTicket } from "@/endpoints";
import { cookies } from "next/headers";

export default async function postTicket(formData: FormData) {
  const token = cookies().get("token")?.value;

  const description = formData.get("description")!.toString();
  const subject = formData.get("subject")!.toString();
  const contact = formData.get("contact")!.toString();
  const location = formData.get("location")!.toString();

  const request: PostTicketTypes = {
    description,
    subject,
    contact,
    location,
  };

  const { message, id } = await postTroubleTicket(token!, request);

  if (message) {
    return {
      message,
      success: true,
      id,
    };
  } else {
    return {
      message: "Cannot create a post",
      success: false,
      id: id,
    };
  }
}
