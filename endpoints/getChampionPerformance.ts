import { ChampionCarousel } from "@/constants/types";

export default async function getChampionPerformance(token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/all-tickets/performance`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data.champions as ChampionCarousel[];
  }

  console.error("endpoint > getChampionPerformance.ts, " + response.status);
  return [];
}
//0.0666666666666667
