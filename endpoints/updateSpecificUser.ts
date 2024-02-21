import { UpdateUserType } from "@/constants/types";

export default async function updateSpecificUser(
  token: string,
  data_: UpdateUserType,
  id: string
) {

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/accounts/manage-user/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PATCH",
      body: JSON.stringify(data_),
    }
  );
  const data = await response.json();

  if (response.ok) {
    return {
      success: true,
      message: data.message as string,
    };
  }

  return {
    success: false,
    message:
      (data.message as string) ||
      "Cannot update the current user, please try again",
  };
}
