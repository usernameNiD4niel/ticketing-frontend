"use server";

import { filterPerformance } from "@/endpoints";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function filterProgressAction(
  championName: string,
  start: string,
  end: string
) {
  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const response = await filterPerformance(token, championName, start, end);

  return response;
}
