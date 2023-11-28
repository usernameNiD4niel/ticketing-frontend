"use server";

import { Login } from "@/constants/types";
import { loginUser } from "@/endpoints";
import { cookies } from "next/headers";

// ! use a signal condition for posting since we're using zod for validation
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

  console.log(`login action > token ::: ${token}`);

  if (success) {
    cookies().set("email", email);
    cookies().set("hr_access_level", hr_access_level);
    cookies().set("it_access_level", it_access_level);
    cookies().set("name", name);
    cookies().set("token", token);
  }

  return { success, message };
}
