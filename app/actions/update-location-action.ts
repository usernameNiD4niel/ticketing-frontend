"use server";

import { updateLocation } from "@/endpoints";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function updateLocationAction(formData: FormData) {
  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const selectedLocation = formData.get("selectedLocation")!.toString();
  const updatedLocation = formData.get("updatedLocation")!.toString();

  const response = await updateLocation(
    selectedLocation,
    updatedLocation,
    token
  );

  if (response.success) {
    revalidateTag("locations-item");
  }

  return response;
}
