type CreateTicketTypesProps = {
  ticket_type: string;
  type: string;
  howLong: string;
};

export default async function createTicketTypes(
  ticketType: CreateTicketTypesProps,
  token: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ticket-types`,
    {
      method: "POST",
      body: JSON.stringify(ticketType),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (response.ok) {
    return {
      success: true,
      message: data.message as string,
    };
  }

  return {
    success: false,
    message:
      (data.message as string) || "Cannot create ticket type, please try again",
  };
}
