import { PostApplicationTypes, RecentApplication } from "@/constants/hr/types";

const updateSpecificApplication = async (
  id: string,
  token: string,
  updateData: PostApplicationTypes
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/applications/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data.message as string;
  }

  throw new Error("Cannot update the specified application, please try again");
};

async function getRecentApplication(token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/applications/recent-application`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data.ra as RecentApplication[];
  }

  throw new Error("Cannot get all of the recent application, please retry");
}

export { updateSpecificApplication, getRecentApplication };
