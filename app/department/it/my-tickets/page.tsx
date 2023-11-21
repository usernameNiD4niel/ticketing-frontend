import React from "react";
import Link from "next/link";
import TroubleCard from "@/components/utils/TroubleCard";
import { cn } from "@/lib/utils";
import { getMyTickets } from "@/endpoints";
import { cookies } from "next/headers";
import TabMutator from "@/components/helper/tab-mutator";
import { AvailableTabs } from "@/constants/enums";

const MyTickets = async () => {
  const token = cookies().get("token")?.value;

  const myTickets = await getMyTickets(token!);

  const getTicketColor = (priority: string) => {
    switch (priority) {
      case "unset":
        return "bg-[#EEF7FF] dark:bg-[#EEF7FF]/50";
      case "low":
        return "bg-[#C3F2FC] dark:bg-[#C3F2FC]/50";
      case "medium":
        return "bg-[#FBFCC3] dark:bg-[#FBFCC3]/50";
      default:
        return "bg-[#FCC3C3] dark:bg-[#FCC3C3]/50";
    }
  };

  return (
    <section className="p-2 w-full flex justify-center flex-col gap-y-2">
      <TabMutator availableTab={AvailableTabs["Existing Tickets"]} />
      <div className="flex flex-col flex-wrap w-full gap-2 md:flex-row">
        {!myTickets || myTickets.length === 0 ? (
          <div className="w-full h-[90vh] flex items-center justify-center">
            <p className="text-xs md:text-sm">
              You don&apos;t have any troubles yet,{" "}
              <Link
                href="department/it/create-ticket"
                className="underline underline-offset-1"
              >
                Create your trouble ticket
              </Link>
            </p>
          </div>
        ) : (
          myTickets.map((ticket) => (
            <TroubleCard
              classColor={cn(getTicketColor(ticket.priority))}
              ticket={ticket}
              key={ticket.id}
              tabName="Existing Tickets"
            />
          ))
        )}
      </div>
    </section>
  );
};

export default MyTickets;
