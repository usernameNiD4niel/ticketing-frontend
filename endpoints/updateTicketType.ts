interface TicketTypeProps {
  type: string;
  howLong: string;
  ticket_type: string;
}

export default async function updateTicketType(
  token: string,
  ticketType: string,
  data: TicketTypeProps
) {
  const _data: {
    type: string;
    howLong: string;
    ticket_type: string | null;
  } = data;

  if (ticketType === data.ticket_type) {
    _data.ticket_type = null;
  }

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
