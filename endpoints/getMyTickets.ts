import { FeedTicketProps } from "@/constants/types";

export default async function getMyTickets(token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tickets/my-tickets`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data["my-tickets"] as FeedTicketProps[];
  }

  throw new Error("Cannot fetch all of your tickets, please try again");
}
