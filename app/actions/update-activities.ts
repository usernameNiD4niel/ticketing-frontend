"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export default async function updateActivities(id: string, formData: FormData) {
  const token = cookies().get("token")?.value;

  const assigned_to = formData.get("assign_to")?.toString();
  const ticket_type = formData.get("ticket_type")?.toString();

  const requestUpdate = {
    priority: formData.get("priority")?.toString().toLowerCase() ?? null,
    assigned_to: assigned_to && assigned_to.length > 0 ? assigned_to : null,
    status: formData.get("status")?.toString().toLowerCase() ?? null,
    ticket_type: ticket_type && ticket_type.length > 0 ? ticket_type : null,
  };

  console.log(`request update ::: ${JSON.stringify(requestUpdate, null, 2)}`);

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
