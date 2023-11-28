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

/**
 * 
 * 
 * .
 
I have this function that request to the external endpoint:

  export default async function postUpdatePassword(postData: ForgotPassword) {
    // await CSRF();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/update-password`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        credentials: "include",

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

  that request is correct and the url is working but it throws me an error saying:

  PUT http://10.10.1.120/api/update-password 422 (Unprocessable Content)

  the backend was created seperated and uses Laravel
 */
