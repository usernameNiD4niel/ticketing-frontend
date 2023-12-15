import { Notifications } from "@/constants/types";

export default async function getNotification(token: string, email: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notifications/${email}`,
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
    return data.notifications as Notifications[];
  }

  return [];
}
