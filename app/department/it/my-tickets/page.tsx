import React from "react";
import { getMyTickets } from "@/endpoints";
import { cookies } from "next/headers";
import TabMutator from "@/components/helper/tab-mutator";
import { AvailableTabs } from "@/constants/enums";
import { DataTable } from "@/components/client/assigned-tickets/data-table";
import { columns } from "@/components/client/assigned-tickets/columns";

const MyTickets = async () => {
  const token = cookies().get("token")?.value;

  const tickets = await getMyTickets(token!);

  return (
    <section className="p-2 w-full flex justify-center flex-col gap-y-2">
      <TabMutator availableTab={AvailableTabs["Existing Tickets"]} />
      <DataTable
        columns={columns}
        data_={tickets.data}
        isAssignedTickets={false}
        next_page_url={tickets.next_page_url}
        url="my-tickets"
        key={"MyTicketsDataTable"}
      />
    </section>
  );
};

export default MyTickets;
