import { ChampionsResponse } from "@/constants/hr/types";

const getHRChampions = async (token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/accounts/role/champion`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data.champions as ChampionsResponse[];
  }

  throw new Error("Error fetchimg the champions");
};

export { getHRChampions };
