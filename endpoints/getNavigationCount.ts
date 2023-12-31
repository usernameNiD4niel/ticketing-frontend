export default async function getNavigationCount(token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-count`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ["navigation-count-tag"],
      },
    }
  );

  if (response.ok) {
    const data: {
      unset_user_count: number;
      unset_priority_ticket_count: number;
      my_assigned_tickets: number;
    } = await response.json();
    return data;
  }

  throw new Error("Cannot get the navigation acivity count");
}
