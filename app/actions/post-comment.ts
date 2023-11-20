"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export default async function postComment(id: string, formData: FormData) {
  const token = cookies().get("token")?.value;

  const request = {
    system_department: "it",
    comment: formData.get("comment"),
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/it-comments/${id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(request),
    }
  );

  if (!response.ok) {
    throw new Error("Cannot create a comment");
  }
  revalidateTag("it-comment");
  return true;
}
