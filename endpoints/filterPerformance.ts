import { FilterProgress } from "@/constants/types";

export default async function filterPerformance(
  token: string,
  championName: string,
  start: string,
  end: string
) {
  let params = "";

  if (start) {
    params += `start=${start}&`;
  }

  if (end) {
    params += `end=${end}`;
  } else {
    if (start) {
      params = params.substring(0, params.length - 1);
      console.log(`params with substring ::: ${params}`);
    }
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/all-tickets/performance/${championName}?${params}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    return { success: true, data: data as FilterProgress };
  }

  console.log(
    `params ${params} ::: response ${JSON.stringify(response, null, 2)}`
  );

  return {
    success: false,
    data: {} as FilterProgress,
  };
}
