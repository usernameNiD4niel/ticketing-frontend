import { DepartmentRolePatch } from "@/constants/types";

export default async function patchPendingDepartmentRole(
  token: string,
  data: DepartmentRolePatch
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pending-role`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (response.ok) {
    const data = await response.json();
    return { message: data.message, success: true } as {
      message: string;
      success: boolean;
    };
  }

  return {
    message: "Cannot update the selected users role",
    success: false,
  };
}
