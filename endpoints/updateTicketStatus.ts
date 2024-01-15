export default async function updateTicketStatus(
  token: string,
  status: string,
  id: number
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tickets?status=${status}&id=${id}`,
    {
      method: "PATCH",
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
      (data.message as string) ??
      "Cannot update the ticket status to " + status + " please try again",
  };
}
