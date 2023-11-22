import { UserProps } from "@/constants/types";

export default async function getPendingDepartmentRole(token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pending-role`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ["users-pending-department-role"],
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data.users as UserProps[];
  }

  throw new Error("Cannot get all of the pending department role");
}
