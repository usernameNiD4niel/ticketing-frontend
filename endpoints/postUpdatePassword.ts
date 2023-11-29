import { ForgotPassword } from "@/constants/types";

export default async function postUpdatePassword(postData: ForgotPassword) {
  // await CSRF();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/update-password`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // "X-Requested-With": "XMLHttpRequest",
      },
      // credentials: "include",

      body: JSON.stringify(postData),
    }
  );

  let success = false;
  const data = await response.json();

  if (response.ok) {
    success = true;
  }

  return { success, message: data.message };
}
