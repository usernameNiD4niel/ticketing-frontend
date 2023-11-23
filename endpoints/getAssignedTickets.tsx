import { CardTicket } from "@/constants/types";

export default async function getAssignedTickets(token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/all-tickets/assigned`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data.assigned_tickets as CardTicket[];
  }

  throw new Error("Fetching all of the assigned tickets error");
}
