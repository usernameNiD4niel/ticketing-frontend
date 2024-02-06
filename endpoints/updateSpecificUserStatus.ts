export default async function updateSpecificUserStatus(
  id: string,
  status: string,
  token: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/accounts/status/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PATCH",
      body: JSON.stringify({ status }),
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
    message: (data.message as string) || "Cannot update the account status",
  };
}
