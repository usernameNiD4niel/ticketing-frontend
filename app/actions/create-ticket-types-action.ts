import { createTicketTypes } from "@/endpoints";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function createTicketTypesAction(formData: FormData) {
  const ticket_type = formData.get("ticketType")?.toString();
  const type = formData.get("type")?.toString();
  const howLong = formData.get("howLong")?.toString();

  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const response = await createTicketTypes(
    { howLong, ticket_type, type },
    token
  );

  if (response.success) {
    // Todo: Create a revalidation here to the get endpoint of ticket types
  }

  return response;
}
