export default async function updateLocation(
  replacingLocation: string,
  newLocation: string,
  token: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/locations/${replacingLocation}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ location: newLocation.trim() }),
    }
  );

  console.log(response);

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
    message: "Cannot update the selected location, please try again",
  };
}
