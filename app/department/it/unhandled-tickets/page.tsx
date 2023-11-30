import React from "react";
import TroubleCard from "@/components/utils/TroubleCard";
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
          next_page_url={unhandledTickets.next_page_url}
          isAssignedTickets={false}
        />
        {/* <div className="flex flex-col flex-wrap w-full gap-2 md:flex-row">
          {unhandledTickets && unhandledTickets.length > 0 ? (
            unhandledTickets.map((ticket) => (
              <TroubleCard
                classColor="bg-[#EEF7FF] dark:bg-[#EEF7FF]/50"
                ticket={ticket}
                key={`UnhandledTickets${ticket.id}`}
                tabName="Unhandled Tickets"
              />
            ))
          ) : (
            <div className="h-[90vh] flex items-center justify-center w-full">
              <h3 className="text-sm">
                You&apos;re doing great! Continue handling all tickets well😉
              </h3>
            </div>
          )}
        </div> */}
      </section>
    </>
  );
};

export default UnhandledTickets;
