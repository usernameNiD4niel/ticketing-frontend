import deleteTicketTypes from "@/endpoints/deleteTicketTypes";
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
    // TODO revalidate the endpoint for displaying all of the ticket types
  }

  return response;
}
