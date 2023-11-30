"use server";

import filterAssignedTable from "@/endpoints/filterAssignedTable";
import { cookies } from "next/headers";

export default async function filterTableAssigned(params: string) {
  const token = cookies().get("token")?.value;

  const tickets = await filterAssignedTable(token!, params);
  return tickets;
}
