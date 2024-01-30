import { TicketTypeColumns } from "@/constants/types";

export default async function getTicketType(
  token: string,
  isCreateTicketType?: boolean
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ticket-types?isCreateTicket=${isCreateTicketType}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ["get-ticket-type"],
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    if (isCreateTicketType && isCreateTicketType === true) {
      return data.ticket_types as string[];
    } else {
      return data.ticket_types as TicketTypeColumns[];
    }
  }
  return [];
}
