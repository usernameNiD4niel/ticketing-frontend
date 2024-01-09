import { columns } from "@/components/client/ticket-types/columns";
import { DataTable } from "@/components/client/ticket-types/data-table";
import TabMutator from "@/components/helper/tab-mutator";
import { AvailableTabs } from "@/constants/enums";
import { TicketTypeColumns } from "@/constants/types";

async function getData(): Promise<TicketTypeColumns[]> {
  return [
    {
      created_at: "1/9/2024",
      duration: "2 days",
      ticket_type: "Software 1",
      updated_at: "1/10/2024",
    },
    {
      created_at: "1/9/2024",
      duration: "2 days",
      ticket_type: "Software 2",
      updated_at: "1/10/2024",
    },
    {
      created_at: "1/9/2024",
      duration: "2 days",
      ticket_type: "Software 3",
      updated_at: "1/10/2024",
    },
    {
      created_at: "1/9/2024",
      duration: "2 days",
      ticket_type: "Software 4",
      updated_at: "1/10/2024",
    },
    {
      created_at: "1/9/2024",
      duration: "2 days",
      ticket_type: "Software 5",
      updated_at: "1/10/2024",
    },
    {
      created_at: "1/9/2024",
      duration: "2 days",
      ticket_type: "Software 6",
      updated_at: "1/10/2024",
    },
    {
      created_at: "1/9/2024",
      duration: "2 days",
      ticket_type: "Software 7",
      updated_at: "1/10/2024",
    },
    {
      created_at: "1/9/2024",
      duration: "2 days",
      ticket_type: "Software 8",
      updated_at: "1/10/2024",
    },
    {
      created_at: "1/9/2024",
      duration: "2 days",
      ticket_type: "Software 9",
      updated_at: "1/10/2024",
    },
    {
      created_at: "1/9/2024",
      duration: "2 days",
      ticket_type: "Software 10",
      updated_at: "1/10/2024",
    },
    {
      created_at: "1/9/2024",
      duration: "2 days",
      ticket_type: "Software 11",
      updated_at: "1/10/2024",
    },
    {
      created_at: "1/9/2024",
      duration: "2 days",
      ticket_type: "Software 12",
      updated_at: "1/10/2024",
    },
    {
      created_at: "1/9/2024",
      duration: "2 days",
      ticket_type: "Software 13",
      updated_at: "1/10/2024",
    },
    {
      created_at: "1/9/2024",
      duration: "2 days",
      ticket_type: "Software 14",
      updated_at: "1/10/2024",
    },
    {
      created_at: "1/9/2024",
      duration: "2 days",
      ticket_type: "Software 15",
      updated_at: "1/10/2024",
    },
    {
      created_at: "1/9/2024",
      duration: "2 days",
      ticket_type: "Software 16",
      updated_at: "1/10/2024",
    },
  ];
}

export default async function TicketTypesPage() {
  const data = await getData();

  return (
    <div>
      <TabMutator
        availableTab={AvailableTabs["Ticket Types"]}
        key={"TicketTypesPage"}
      />
      <h1 className="w-full text-start text-lg">Ticket Type</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
