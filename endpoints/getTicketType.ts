import { TicketTypeColumns } from "@/constants/types";

export default async function getTicketType(token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ticket-types`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data.ticket_types as TicketTypeColumns[];
  }

  console.log(`get ticket type < endpoint`);
  return [];
}
