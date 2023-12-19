import { PostTicketTypes } from "@/constants/types";

export default async function postTroubleTicket(
  token: string,
  data: PostTicketTypes
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tickets`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  console.log(`response ::: ${JSON.stringify(response, null, 2)}`);

  if (response.ok) {
    const data_ = await response.json();

    return { id: data_.id, message: data_.message as string };
  }

  throw new Error("Cannot post a trouble ticket");
}
