export default async function deleteTicketTypes<TData>(
  token: string,
  toBeDeleted: TData[]
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ticket-types`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data: toBeDeleted }),
    }
  );

  if (response.ok) {
    const data = await response.json();

    return {
      message: data.message,
      success: true,
    };
  }

  return {
    message: "Cannot delete the selected data",
    success: false,
  };
}
