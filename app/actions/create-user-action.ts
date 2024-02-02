"use server";
import { createUser } from "@/endpoints";
import { cookies } from "next/headers";

export default async function createUserAction(formData: FormData) {
  const email = formData.get("email")!.toString();
  const name = formData.get("name")!.toString();
  const password = formData.get("password")!.toString();
  const department = formData.get("department")!.toString();

  const response = await createUser({
    department,
    email,
    name,
    password,
  });

  if (response.success) {
    const sevenDaysFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    cookies().set("token", response.data.token, { expires: sevenDaysFromNow });
    cookies().set("email", email, { expires: sevenDaysFromNow });
    cookies().set("it_access_level", response.data.it_access_level, {
      expires: sevenDaysFromNow,
    });
    cookies().set("hr_access_level", response.data.hr_access_level, {
      expires: sevenDaysFromNow,
    });
    cookies().set("name", response.data.name, {
      expires: sevenDaysFromNow,
    });
  }

  return { success: response.success, message: response.message };
}
