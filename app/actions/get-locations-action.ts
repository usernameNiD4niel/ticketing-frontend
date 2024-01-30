"use server";

import { getLocations } from "@/endpoints";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function getLocationsAction() {
  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const response = await getLocations(token, true);

  return response as string[];
}
