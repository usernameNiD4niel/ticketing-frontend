export default async function updateUserStatus(
  token: string,
  userIds: string[],
  status: string,
  column: string
) {
  console.log(`user id ::: ${userIds}`);
  console.log(`status ::: ${status}`);
  console.log(`column ::: ${column}`);

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

  console.log(`dataaa ::: ${JSON.stringify(data, null, 2)}`);

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
