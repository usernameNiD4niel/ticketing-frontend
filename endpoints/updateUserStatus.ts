export default async function updateUserStatus(
  token: string,
  userIds: string[],
  status: string,
  column: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/accounts/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ users_ids: userIds, status, column }),
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
      (data.message as string) ||
      "The selected data cannot be updated, please try again",
  };
}
