import { ManageUser } from "@/constants/types";

export default async function getManageUser(token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/accounts/status`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ["get-table-data-manage-user"],
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data.users as ManageUser[];
  }

  return [];
}
