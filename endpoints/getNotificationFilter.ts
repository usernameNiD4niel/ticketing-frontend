import { Notifications } from "@/constants/types";

export default async function getNotificationFilter(
  token: string,
  operation: "filter today" | "filter this week" | "filter this month"
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notifications?operation=${operation}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data.notification as Notifications[];
  }

  return [];
}
