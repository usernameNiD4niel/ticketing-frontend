import { columns } from "@/components/client/assigned-tickets/columns";
import { DataTable } from "@/components/client/assigned-tickets/data-table";
import TabMutator from "@/components/helper/tab-mutator";
import { AvailableTabs } from "@/constants/enums";
import { getAssignedTickets } from "@/endpoints";
import { cookies } from "next/headers";

export default async function Page() {
  const token = cookies().get("token")?.value;

  const tickets = await getAssignedTickets(token!, 1);

  return (
    <>
      <TabMutator availableTab={AvailableTabs["Assigned Tickets"]} />
      <section className="p-2 w-full flex justify-center flex-col gap-y-2">
        <DataTable
          columns={columns}
          data_={tickets.data}
          isAssignedTickets={true}
          next_page_url={tickets.next_page_url}
          url="all-tickets/assigned"
          key={"AssignedTicketsDataTable"}
        />
      </section>
    </>
  );
}
