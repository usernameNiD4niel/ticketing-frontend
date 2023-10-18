"use client";
import { PaginatedType, Payment } from "@/constants/types";
import { columns } from "./table/columns";
import { DataTable } from "./table/data-table";
import Cookies from "js-cookie";
import ActiveTabFeed from "@/components/client/feed/ActiveTab";
import { useEffect, useState } from "react";

async function getData(
  page: number,
  token: string,
  setNextPageUrl: React.Dispatch<React.SetStateAction<string | null>>
): Promise<Payment[]> {
  // Fetch data from your API here.
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/all-tickets/pages?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (data.ok) {
    const response: Promise<PaginatedType> = await data.json();
    const tickets = (await response).data;
    const filteredTickets: Payment[] = [];
    tickets.forEach((value) => {
      filteredTickets.push({
        id: value.id,
        assigned_to: value.assigned_to,
        created_at: value.created_at,
        name: value.name,
        status: value.status,
        subject:
          value.subject.length > 35
            ? value.subject.substring(0, 35) + "..."
            : value.subject,
      });
    });
    setNextPageUrl((await response).next_page_url);
    return filteredTickets;
  } else {
    throw new Error("Cannot fetch all the tickets, sorry😪");
  }
}

export default function DemoPage() {
  const token = Cookies.get("token");

  const [data, setData] = useState<Payment[]>([]);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);

  useEffect(() => {
    console.log("the next page is: ", nextPageUrl);
  }, [nextPageUrl]);

  const fetchData = async () => {
    const data_ = await getData(1, token!, setNextPageUrl);
    setData(data_);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full md:container py-10">
      <DataTable
        columns={columns}
        data={data}
        setData={setData}
        next_page_url={nextPageUrl}
      />
      <ActiveTabFeed />
    </div>
  );
}
