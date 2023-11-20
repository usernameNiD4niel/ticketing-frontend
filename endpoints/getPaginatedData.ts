import { Payment } from "@/constants/types";

interface HelperResponseType {
  next_page_url: number | null;
  data: Payment[];
}

export default async function getPaginatedData(page: number, token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/all-tickets/pages?page=${page}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();

    return data as HelperResponseType;
  }

  throw new Error("Cannot get the paginated tickets from the server");
}
