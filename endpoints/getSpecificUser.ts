import { ManageUserProps } from "@/constants/types";

export default async function getSpecificUser(token: string, id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/accounts/manage-user/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data.user as ManageUserProps;
  }

  console.log(`check`);
  return {} as ManageUserProps;
}
