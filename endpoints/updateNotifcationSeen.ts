import { UpdateNotification } from "@/constants/types";

export default async function updateNotificationSeen(
  token: string,
  notifData: UpdateNotification
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notifications`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(notifData),
    }
  );

  if (response.ok) {
    const data = await response.json();
    console.log(data.message);
    return true;
  }

  return false;
}
