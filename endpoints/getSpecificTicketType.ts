import { TicketType } from "@/constants/types";

export default async function getSpecificTicketType(
  token: string,
  ticketType: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ticket-types/${ticketType}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data.ticket_type as TicketType;
  }

  return {} as TicketType;
}
