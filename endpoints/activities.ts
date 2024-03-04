import { HrActivity } from "@/constants/hr/types";

export async function getSpecifiedActivity(id: string, token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/hr-activity/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data.activities as HrActivity[];
  }
  throw new Error("Cannot get all activities");
}
