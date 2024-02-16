"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { searchTickets } from "@/endpoints";

export default async function searchTicketAction<T>(formData: FormData) {
  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const search = formData.get("search")!.toString();
  const module_ = formData.get("module")?.toString();
  const specific_status = formData.get("specific_status")?.toString();

  const response = (await searchTickets(
    token,
    search,
    module_ || "",
    specific_status || ""
  )) as T[];

  return response;
}
