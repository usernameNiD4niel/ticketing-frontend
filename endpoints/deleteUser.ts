export default async function deleteUser(names: string[], token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/accounts`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ names }),
    }
  );

  if (response.ok) {
    const data = await response.json();
    return {
      success: true,
      message: data.message as string,
    };
  }

  return {
    success: false,
    message: "Cannot update the selected user",
  };
}
