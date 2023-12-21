"use server";
import { PostTicketTypes } from "@/constants/types";
import { postTroubleTicket } from "@/endpoints";
import { cookies } from "next/headers";

function getFormattedName(name: string) {
  const splittedName = name.split(" ");

  let newString = "";
  for (const name_ of splittedName) {
    newString += name_.charAt(0).toUpperCase() + name_.substring(1) + " ";
  }

  return newString.trim();
}

export default async function postTicket(formData: FormData) {
  const token = cookies().get("token")?.value;

  const description = formData.get("description")!.toString();
  const subject = formData.get("subject")!.toString();
  const contact = formData.get("contact")!.toString();
  const location = formData.get("location")!.toString();
  const requestor = formData.get("requestor")?.toString();

  const request: PostTicketTypes = {
    description,
    subject,
    contact,
    location,
  };

  if (requestor) {
    request.requestor = getFormattedName(requestor);
  }

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
