type CreateTicketTypesProps = {
  ticket_type?: string;
  type?: string;
  howLong?: string;
};

export default async function createTicketTypes(
  ticketType: CreateTicketTypesProps,
  token: string
) {
  console.log(`ticket type ::: ${JSON.stringify(ticketType, null, 2)}`);
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
    console.log("is it ok");

    return {
      success: true,
      message: data.message as string,
    };
  }

  console.log("or not");
  return {
    success: false,
    message:
      (data.message as string) || "Cannot create ticket type, please try again",
  };
}
