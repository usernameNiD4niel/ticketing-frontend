"use server";
import { PostTicketTypes } from "@/constants/types";
import { postTroubleTicket } from "@/endpoints";
import { cookies } from "next/headers";

export default async function postTicket(formData: FormData) {
  const token = cookies().get("token")?.value;
  console.log(`the token ::: ${token}`);

  const description = formData.get("description")!.toString();
  const subject = formData.get("subject")!.toString();

  const request: PostTicketTypes = {
    description,
    subject,
  };

  console.log(`the request ::: ${JSON.stringify(request, null, 2)}`);

  const message = await postTroubleTicket(token!, request);

  if (message) {
    return {
      message,
      success: true,
    };
  } else {
    return {
      message: "Cannot create a post",
      success: false,
    };
  }
}
