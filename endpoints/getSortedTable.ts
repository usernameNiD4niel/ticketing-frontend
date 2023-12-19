import { AssignedTickets } from "@/constants/types";

export default async function getSortedTable(
  sort: string,
  order_by: string,
  token: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tickets/sort?sort=${sort}&order_by=${order_by}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data.tickets as AssignedTickets[];
  }

  return [];
}
