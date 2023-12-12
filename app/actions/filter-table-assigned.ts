"use server";

import filterAssignedTable from "@/endpoints/filterAssignedTable";
import { cookies } from "next/headers";

export default async function filterTableAssigned(formData: FormData) {
  const token = cookies().get("token")?.value;

  const params = formData.get("params")!.toString();

  console.log(`action params ::: ${params}`);

  const tickets = await filterAssignedTable(token!, params);
  return tickets;
}
