export default async function searchTickets<T>(
  token: string,
  search: string,
  module: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/all-tickets/search?query=${search}&module=${module}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    console.log(`data ::: ${JSON.stringify(data, null, 2)}`);

    return data.tickets as T[];
  }

  console.log(response);

  return [];
}
