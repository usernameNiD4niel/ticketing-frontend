import { columns } from "@/components/client/ticket-types/columns";
import { DataTable } from "@/components/client/ticket-types/data-table";
import { TicketTypeColumns } from "@/constants/types";

async function getData(): Promise<TicketTypeColumns[]> {
  return [
    {
      created_at: "1/9/2024",
      duration: "2 days",
      ticket_type: "Software",
      updated_at: "1/10/2024",
    },
    {
      created_at: "1/9/2024",
      duration: "2 days",
      ticket_type: "Software",
      updated_at: "1/10/2024",
    },
    {
      created_at: "1/9/2024",
      duration: "2 days",
      ticket_type: "Software",
      updated_at: "1/10/2024",
    },
    {
      created_at: "1/9/2024",
      duration: "2 days",
      ticket_type: "Software",
      updated_at: "1/10/2024",
    },
    {
      created_at: "1/9/2024",
      duration: "2 days",
      ticket_type: "Software",
      updated_at: "1/10/2024",
    },
    {
      created_at: "1/9/2024",
      duration: "2 days",
      ticket_type: "Software",
      updated_at: "1/10/2024",
    },
    {
      created_at: "1/9/2024",
      duration: "2 days",
      ticket_type: "Software",
      updated_at: "1/10/2024",
    },
    {
      created_at: "1/9/2024",
      duration: "2 days",
      ticket_type: "Software",
      updated_at: "1/10/2024",
    },
    {
      created_at: "1/9/2024",
      duration: "2 days",
      ticket_type: "Software",
      updated_at: "1/10/2024",
    },
    {
      created_at: "1/9/2024",
      duration: "2 days",
      ticket_type: "Software",
      updated_at: "1/10/2024",
    },
    {
      created_at: "1/9/2024",
      duration: "2 days",
      ticket_type: "Software",
      updated_at: "1/10/2024",
    },
    {
      created_at: "1/9/2024",
      duration: "2 days",
      ticket_type: "Software",
      updated_at: "1/10/2024",
    },
    {
      created_at: "1/9/2024",
      duration: "2 days",
      ticket_type: "Software",
      updated_at: "1/10/2024",
    },
    {
      created_at: "1/9/2024",
      duration: "2 days",
      ticket_type: "Software",
      updated_at: "1/10/2024",
    },
    {
      created_at: "1/9/2024",
      duration: "2 days",
      ticket_type: "Software",
      updated_at: "1/10/2024",
    },
    {
      created_at: "1/9/2024",
      duration: "2 days",
      ticket_type: "Software",
      updated_at: "1/10/2024",
    },
  ];
}

export default async function TicketTypesPage() {
  const data = await getData();

  return (
    <div>
      <h1 className="w-full text-start text-lg">Ticket Type</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
