interface TicketTypeProps {
  type: string;
  howLong: string;
  ticketType: string;
}

export default async function updateTicketType(
  token: string,
  ticketType: string,
  data: TicketTypeProps
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ticket-types/${ticketType}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  const data_ = await response.json();

  if (response.ok) {
    return {
      success: true,
      message: data_.message as string,
    };
  }
  return {
    success: false,
    message:
      (data_.message as string) ||
      "Cannot update the " + ticketType + " please try again",
  };
}
// ! use this tom!
