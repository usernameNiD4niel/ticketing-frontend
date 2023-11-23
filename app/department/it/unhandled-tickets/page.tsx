import React, { Suspense } from "react";
import { FeedTicketProps } from "@/constants/types";
import TroubleCard from "@/components/utils/TroubleCard";
import { getCookies } from "next-client-cookies/server";
import UnHandledTab from "@/components/client/unhandled-tickets/tab";

type ResponseHelper = {
  tickets: FeedTicketProps[];
};

const getUnHandledTickets = async (token: string) => {
  const response: ResponseHelper = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/unhandled-tickets`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  )
    .then((data) => data.json())
    .catch((error) => error);

  return response.tickets;
};

const UnhandledTickets = async () => {
  const token = getCookies().get("token");
  const role = getCookies().get("it_access_level");

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
                key={ticket.id}
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
