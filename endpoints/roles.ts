import { FetchingUsersRole } from "@/constants/hr/types";

// this should only use in RSC
const getSpecifiedRole = async (role: string, token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/accounts/role?role=${role}&column=hr_access_level`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data.users as FetchingUsersRole[];
  }

  throw new Error(`Cannot get all the users that has a role of ${role}`);
};

export { getSpecifiedRole };
