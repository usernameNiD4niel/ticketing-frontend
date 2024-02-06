"use server";

import { getPaginatedFeed } from "@/endpoints";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function getPaginatedFeedAction(
  is_default: boolean,
  page: number
) {
  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const response = await getPaginatedFeed(token, is_default, page);

  return response;
}
