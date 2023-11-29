"use server";

import { getOtpGenerated } from "@/endpoints";

export default async function resendOtpAction(formData: FormData) {
  const email = formData.get("email")!.toString();

  const response = await getOtpGenerated(email);

  return response;
}
