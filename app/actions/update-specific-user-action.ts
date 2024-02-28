"use server";

import { UpdateUserType } from "@/constants/types";
import { updateSpecificUser } from "@/endpoints";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function updateSpecificUserAction(formData: FormData) {
  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const id = formData.get("id")!.toString();

  const data: UpdateUserType = {
    department: formData.get("department")?.toString(),
    role: formData.get("access-role")?.toString(),
    email: formData.get("email")?.toString(),
  };

  const password = formData.get("password")?.toString();

  if(password) {
    data.password = password;
  }

  const response = await updateSpecificUser(token, data, id);

  if (response.success) {
    revalidateTag("get-table-data-manage-user");
  }

  return response;
}
