import { columns } from "@/components/client/assigned-tickets/columns";
import { DataTable } from "@/components/client/assigned-tickets/data-table";
import TabMutator from "@/components/helper/tab-mutator";
import { AvailableTabs } from "@/constants/enums";
import { getAssignedTickets } from "@/endpoints";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const token = cookies().get("token")?.value;
  const name = cookies().get("name")?.value;

  if (!token || !name) {
    redirect("/login");
  }

  // ? Assigned Tickets
  const tickets = await getAssignedTickets(token, 1, false);

  // ? Closed Tickets
  const closedTickets = await getAssignedTickets(token, 1, true);

  return (
    <>
      <TabMutator availableTab={AvailableTabs["Assigned Tickets"]} />
      <section className="p-2 w-full flex justify-center flex-col gap-y-2">
        <div>
          <h3 className="w-full font-bold">Assigned Tickets</h3>
          <DataTable
            columns={columns}
            data_={tickets.data}
            isAssignedTickets={true}
            module="assigned_tickets"
            next_page_url={tickets.next_page_url}
            url={`all-tickets/export?champion=${name}&status=open`}
            tab="assigned_tickets"
            key={"AssignedTicketsDataTable1"}
            isClosed={false}
          />
        </div>
        <hr className="my-10" />
        <div>
          <h3 className="w-full font-bold">Resolved Tickets</h3>
          <DataTable
            columns={columns}
            data_={closedTickets.data}
            isAssignedTickets={true}
            module="assigned_tickets"
            isClosed={true}
            next_page_url={closedTickets.next_page_url}
            url={`all-tickets/export?champion=${name}&status=closed`}
            tab="assigned_tickets"
            key={"AssignedTicketsDataTable2"}
          />
        </div>
      </section>
    </>
  );
}
