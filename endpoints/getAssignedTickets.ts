import { AssignedPaginatedType } from "@/constants/types";

export default async function getAssignedTickets(
  token: string,
  page: number,
  isClosed: boolean
) {
  //api/all-tickets/conditional?isPreviewing=true&tab=assigned_tickets
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/all-tickets/conditional?isPreviewing=true&tab=assigned_tickets&shouldPaginate=true&page=${page}&isClosed=${isClosed}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ["assigned-tickets-tag"],
      },
    }
  );

  if (response.ok) {
    const data = await response.json();

    return data as AssignedPaginatedType;
  }

  throw new Error("Fetching all of the assigned tickets error");
}
