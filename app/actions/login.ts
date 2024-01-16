"use server";

import { Login } from "@/constants/types";
import { loginUser } from "@/endpoints";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function login(formData: FormData) {
  const postData: Login = {
    email: formData.get("email")!.toString(),
    password: formData.get("password")!.toString(),
  };

  const {
    data: { email, hr_access_level, it_access_level, name, token },
    success,
    message,
  } = await loginUser(postData);

  if (success) {
    if (it_access_level.toLowerCase() === "unset") {
      redirect(`/department/pending-user?user=${name}&email=${email}`);
    }

    const sevenDaysFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    cookies().set("email", email, { expires: sevenDaysFromNow });
    cookies().set("hr_access_level", hr_access_level, {
      expires: sevenDaysFromNow,
    });
    cookies().set("it_access_level", it_access_level, {
      expires: sevenDaysFromNow,
    });
    cookies().set("name", name, { expires: sevenDaysFromNow });
    cookies().set("token", token, { expires: sevenDaysFromNow });
  }

  return { success, message };
}
