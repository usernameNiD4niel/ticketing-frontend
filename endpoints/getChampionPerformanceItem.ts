import { FilterProgress } from "@/constants/types";

export default async function getChampionPerformanceItem(
  token: string,
  championName: string
) {
  console.log(`champion name: ${championName}`);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/all-tickets/performance?championName=${championName}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data.champions as FilterProgress;
  }

  console.error("endpoint > getChampionPerformanceItem.ts, " + response.status);
  throw new Error("Cannot get the champion performance, please try again");
}
//0.0666666666666667
