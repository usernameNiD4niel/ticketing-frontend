"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export default async function updateActivities(id: string, formData: FormData) {
  const token = cookies().get("token")?.value;

  const requestUpdate = {
    priority: formData.get("priority")?.toString().toLowerCase() ?? null,
    assigned_to: formData.get("assigned_to")?.toString().toLowerCase() ?? null,
    status: formData.get("status")?.toString().toLowerCase() ?? null,
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/all-tickets/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestUpdate),
    }
  );

  if (response.ok) {
    const data = await response.json();

    revalidateTag("it-activities");
    revalidateTag(`it-tickets-item-${id}`);

    if (formData.get("assigned_to")) {
      revalidateTag("navigation-count-tag");
    }
    return data.message as string;
  } else {
    throw new Error("Cannot process update...");
  }
}
