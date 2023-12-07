import { Payment } from "@/constants/types";

export default async function myTickets(token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/my-tickets`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();

    return data.tickets as Payment[];
  }

  throw new Error("Cannot fetch all of your tickets, please try again");

  /**
   *   const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/all-tickets/assigned?page=${page}&sortedBy=created_at&ordering=desc`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();

    return data as AssignedPaginatedType;
  }

  throw new Error("Fetching all of the assigned tickets error");
   */
}
