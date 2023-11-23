import React from "react";
import TroubleCard from "@/components/utils/TroubleCard";
import UnHandledTab from "@/components/client/unhandled-tickets/tab";
import { getUnHandledTickets } from "@/endpoints";
import { cookies } from "next/headers";

const UnhandledTickets = async () => {
  const token = cookies().get("token")?.value;
  const role = cookies().get("it_access_level")?.value;

  const unhandledTickets = await getUnHandledTickets(token!);

  return (
    <>
      <UnHandledTab role={role!} />
      <section className="p-2 w-full flex justify-center flex-col gap-y-2">
        <div className="flex flex-col flex-wrap w-full gap-2 md:flex-row">
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
        </div>
      </section>
    </>
  );
};

export default UnhandledTickets;
