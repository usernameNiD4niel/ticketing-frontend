"use client";
import { Payment } from "@/constants/types";
import { columns } from "./table/columns";
import { DataTable } from "./table/data-table";
import Cookies from "js-cookie";
import ActiveTabFeed from "@/components/client/feed/ActiveTab";
import { useEffect, useState } from "react";

type ResponseType = {
  tickets: Payment[];
};

async function getData(token: string): Promise<Payment[]> {
  // Fetch data from your API here.
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/all-tickets/default`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (data.ok) {
    const response: Promise<ResponseType> = await data.json();
    const tickets = (await response).tickets;
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
    return filteredTickets;
  } else {
    throw new Error("Cannot fetch all the tickets, sorry😪");
  }
}

export default function DemoPage() {
  const token = Cookies.get("token");

  const [data, setData] = useState<Payment[]>([]);

  const fetchData = async () => {
    const data_ = await getData(token!);
    setData(data_);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full md:container py-10">
      <DataTable columns={columns} data={data} setData={setData} />
      <ActiveTabFeed />
    </div>
  );
}
