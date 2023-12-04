import { Login, LoginDataResponse } from "@/constants/types";

export default async function loginUser(loginData: Login) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
      cache: "no-cache",
    }
  );

  const data = await response.json();

  let success = false;

  if (response.ok) {
    success = true;
  }

  return { success, data: data.data, message: data.message } as {
    success: boolean;
    data: LoginDataResponse;
    message: string;
  };
}
