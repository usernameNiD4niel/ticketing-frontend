"use server";

import { getSortedTable } from "@/endpoints";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function getSortedTableAction(formData: FormData) {
  const sort = formData.get("sort")!.toString();
  const order_by = formData.get("order_by")!.toString();
  const isClosed = formData.get("isClosed")?.toString();
  const module_ = formData.get("module")?.toString() || "Unhandled Tickets";

  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const response = await getSortedTable(
    sort,
    order_by,
    token,
    isClosed,
    module_
  );

  return response;
}
