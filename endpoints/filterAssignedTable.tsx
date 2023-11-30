import { AssignedTickets } from "@/constants/types";

export default async function filterAssignedTable(
  token: string,
  params: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/all-tickets/assigned-filter?${params}`,
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

  throw new Error("Cannot filter the data, please try again");
}
