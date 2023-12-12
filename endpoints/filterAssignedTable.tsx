import { AssignedTickets } from "@/constants/types";

export default async function filterAssignedTable(
  token: string,
  params: string
) {
  console.log(`filter assigned params ::: ${params}`);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/all-tickets/assigned-filter?${params}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();

    console.log(`assigned filter tickets ::: ${JSON.stringify(data, null, 2)}`);

    return data.tickets as AssignedTickets[];
  }

  console.log(response);

  throw new Error("Cannot filter the data, please try again");
}
