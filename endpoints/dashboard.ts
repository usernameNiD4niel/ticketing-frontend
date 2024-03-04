import { RecentRequestedManpower, StatusCount } from "@/constants/hr/types";

export async function getApplicationStatusCount(token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/manpower/status-count`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data as StatusCount;
  }

  throw new Error("Cannot fetch all the counts of status");
}

export async function getRecentManpower(token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/manpower/recent-requested`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data.manpower as RecentRequestedManpower[];
  }

  throw new Error("Cannopt get all of the recent requested manpower");
}
