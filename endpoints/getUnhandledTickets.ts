import { AssignedPaginatedType, AssignedTickets } from "@/constants/types";

export default async function getUnHandledTickets(token: string, page: number) {
  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/unhandled-tickets`,
  //   {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //   }
  // )
  //   .then((data) => data.json())
  //   .catch((error) => error);

  // return response.tickets as AssignedTickets[];
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/unhandled-tickets?page=${page}&sortedBy=created_at&ordering=desc`,
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
