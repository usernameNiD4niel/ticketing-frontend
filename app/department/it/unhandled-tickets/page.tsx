import React from "react";
import UnHandledTab from "@/components/client/unhandled-tickets/tab";
import { getUnHandledTickets } from "@/endpoints";
import { cookies } from "next/headers";
import { DataTable } from "@/components/client/assigned-tickets/data-table";
import { columns } from "@/components/client/assigned-tickets/columns";

const UnhandledTickets = async () => {
  const token = cookies().get("token")?.value;
  const role = cookies().get("it_access_level")?.value;

  const unhandledTickets = await getUnHandledTickets(token!, 1);

  return (
    <>
      <UnHandledTab role={role!} />
      <section className="p-2 w-full flex justify-center flex-col gap-y-2">
        <DataTable
          columns={columns}
          data_={unhandledTickets.data}
          module="unhandled_tickets"
          next_page_url={unhandledTickets.next_page_url}
          isAssignedTickets={false}
          url="unhandled-tickets"
          key={"UnhandledTicketsDataTable"}
        />
      </section>
    </>
  );
};

export default UnhandledTickets;
