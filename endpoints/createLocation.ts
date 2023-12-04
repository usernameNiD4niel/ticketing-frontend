export default async function createLocation(location: string, token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/locations`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ location }),
    }
  );
  const data = await response.json();

  if (response.ok) {
    return {
      message: data.message as string,
      success: true,
    };
  }

  if (response.status === 403) {
    return {
      message: data.message as string,
      success: false,
    };
  }

  return {
    message: "Cannot create ticket, please try again",
    success: false,
  };
}
