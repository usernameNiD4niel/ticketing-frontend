import { AssignedPaginatedType } from "@/constants/types";

export default async function getUnHandledTickets(token: string) {
  //isPreviewing=true&tab=assigned_tickets&shouldPaginate=true&page=${page}
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/all-tickets/conditional?isPreviewing=true&tab=unhandled_tickets&shouldPaginate=true&page=1`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ["dynamic-table-pagination"],
      },
    }
  );

  if (response.ok) {
    const data = await response.json();

    return data as AssignedPaginatedType;
  }

  throw new Error("Fetching all of the assigned tickets error");
}
