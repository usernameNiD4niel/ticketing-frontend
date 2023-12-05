import { AccountProps } from "@/constants/types";

export default async function getAccount(token: string, email: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/accounts/${email}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data.account as AccountProps;
  }

  console.log(`status ::: ${response.status}`);

  throw new Error("Cannot fetch your account, please try again");
}
