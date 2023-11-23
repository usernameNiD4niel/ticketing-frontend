import { CodeTableProps } from "@/constants/types";

export default async function getCodes(token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/codes`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data.otps as CodeTableProps[];
  }

  throw new Error("Cannot all fetched codes");
}
