export default async function deleteLocation(token: string, location: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/locations/${location}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const { message } = await response.json();

  if (response.ok) {
    return {
      success: true,
      message,
    };
  }

  if (response.status === 404) {
    return {
      success: false,
      message,
    };
  }

  return {
    success: false,
    message,
  };
}
