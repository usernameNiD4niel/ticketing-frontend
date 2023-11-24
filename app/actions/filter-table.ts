"use server";

import { getFilteredData } from "@/endpoints";
import { cookies } from "next/headers";

export default async function filterTable(params: string) {
  const token = cookies().get("token")?.value;

  const tickets = await getFilteredData(token!, params);
  return tickets;
}
