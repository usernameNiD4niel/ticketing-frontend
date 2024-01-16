"use server";

import { cookies } from "next/headers";

export default async function deleteCookiesAction() {
  cookies().delete("hr_access_level");
  cookies().delete("it_access_level");
  cookies().delete("name");
  cookies().delete("email");
  cookies().delete("token");
}
