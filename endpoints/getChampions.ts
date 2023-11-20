export default async function getChampions(token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/champions`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data.champions as string[];
  }
  throw new Error("Cannot fetch all the champions");
}
