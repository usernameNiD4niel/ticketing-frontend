import { Payment } from "@/constants/types";
import { columns } from "./table/columns";
import { DataTable } from "./table/data-table";
import { getCookies } from "next-client-cookies/server";

type ResponseType = {
  tickets: Payment[];
};

async function getData(token: string): Promise<Payment[]> {
  // Fetch data from your API here.
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/all-tickets`,
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
          value.subject.length > 15
            ? value.subject.substring(0, 15) + "..."
            : value.subject,
      });
    });
    return filteredTickets;
  } else {
    throw new Error("Cannot fetch all the tickets, sorry😪");
  }
}

export default async function DemoPage() {
  const token = getCookies();

  const data = await getData(token.get("token")!);
  return (
    <div className="container  py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
