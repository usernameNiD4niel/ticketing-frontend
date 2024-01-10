"use server";

import { deleteTicketTypes } from "@/endpoints";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function deleteTicketTypesAction<TData>(
  toBeDeleted: TData[]
) {
  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const response = await deleteTicketTypes(token, toBeDeleted);

  if (response.success) {
    revalidateTag("get-ticket-type");
  }

  return response;
}
