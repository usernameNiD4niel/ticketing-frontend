export default async function updateNotification(token: string, id: string) {
  // what ever happen just take a deep breath
  await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notifications/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
