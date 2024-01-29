import { Payment } from "@/constants/types";

export default async function getFilteredData(token: string, params: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/all-tickets/filter?${params}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();

    console.log(`filter ::: ${JSON.stringify(data, null, 2)}`);

    return data.tickets as Payment[];
  }

  throw new Error("Cannot filter the data, please try again");
}
