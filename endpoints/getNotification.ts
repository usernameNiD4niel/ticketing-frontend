import { Notifications } from "@/constants/types";

export default async function getNotification(token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notifications?is_default=true`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ["get-notification"],
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data.notification as Notifications[];
  }

  return [];
}
