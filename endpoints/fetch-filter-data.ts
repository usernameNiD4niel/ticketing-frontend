import { FeedData } from "@/constants/hr/types";

export async function fetchFilteredData(token: string, params: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/manpower/filter?${params}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data as FeedData[];
  }

  throw new Error("The filtered data not found!");
}
