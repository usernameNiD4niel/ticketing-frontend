import { AssignedTickets } from "@/constants/types";

export default async function getUnHandledTickets(token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/unhandled-tickets`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  )
    .then((data) => data.json())
    .catch((error) => error);

  return response.tickets as AssignedTickets[];
}
