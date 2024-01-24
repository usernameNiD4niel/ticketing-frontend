export default async function getTicketTodayCount(token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/all-tickets/my-ticket/today`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    const count = await response.json();
    return {
      ticket_count: count.ticket_count as number,
    };
  }

  return {
    ticket_count: 0,
  };
}
