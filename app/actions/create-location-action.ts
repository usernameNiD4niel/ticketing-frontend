"use server";
import { createLocation } from "@/endpoints";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function createLocationAction(formData: FormData) {
  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const location = formData.get("location")!.toString();

  const response = await createLocation(location, token);

  return response;
}
