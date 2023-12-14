import { redirect } from "next/navigation";

export default async function getNotificationCount(token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notifications/count`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 60,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data.count as number;
  }

  if (response.status === 401) {
    redirect("/login");
  }

  return 0;
}
