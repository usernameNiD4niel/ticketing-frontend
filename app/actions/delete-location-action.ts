"use server";

import deleteLocation from "@/endpoints/deleteLocation";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function deleteLocationAction(formData: FormData) {
  const token = cookies().get("token")?.value;
  if (!token) {
    redirect("/login");
  }

  const location = formData.get("location")!.toString();

  const response = await deleteLocation(token, location);

  if (response.success) {
    revalidateTag("locations-item");
  }

  return response;
}
