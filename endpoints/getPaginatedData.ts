import { Payment } from "@/constants/types";

interface HelperResponseType {
  next_page_url: number | null;
  data: Payment[];
  pageCount: number;
  currentPage: number;
}

export default async function getPaginatedData(page: number, token: string) {
  // http://10.10.1.120/api/all-tickets/pages?page=1&sortedBy=created_at&ordering=asc
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/all-tickets/pages?page=${page}&sortedBy=created_at&ordering=desc`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ["feed-table-get-data"],
      },
    }
  );

  if (response.ok) {
    const data = await response.json();

    return data as HelperResponseType;
  }

  throw new Error("Cannot get the paginated tickets from the server");
}
