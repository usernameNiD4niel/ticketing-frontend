import { Payment } from "@/constants/types";

interface HelperResponseType {
  next_page_url: number | null;
  data: Payment[];
  pageCount: number;
  currentPage: number;
}

export default async function getPaginatedFeed(
  token: string,
  is_default: boolean,
  page: number
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/all-tickets/pages?page=${page}&sortedBy=created_at&ordering=desc&is_default=${is_default}`,
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

  return {} as HelperResponseType;
}
