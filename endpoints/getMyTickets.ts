import { AssignedPaginatedType } from "@/constants/types";

export default async function getMyTickets(token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/my-tickets/page`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();

    console.log(`dataaa ::: ${JSON.stringify(data, null, 2)}`);

    return data as AssignedPaginatedType;
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
