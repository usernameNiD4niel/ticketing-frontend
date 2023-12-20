import { AssignedPaginatedType, AssignedTickets } from "@/constants/types";

export default async function getAssignedTickets(token: string, page: number) {
  //api/all-tickets/conditional?isPreviewing=true&tab=assigned_tickets
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/all-tickets/conditional?isPreviewing=true&tab=assigned_tickets&shouldPaginate=true&page=${page}`,
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
}
