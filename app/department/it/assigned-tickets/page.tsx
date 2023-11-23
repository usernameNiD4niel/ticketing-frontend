import TabMutator from "@/components/helper/tab-mutator";
import TroubleCard from "@/components/utils/TroubleCard";
import { AvailableTabs } from "@/constants/enums";
import { getAssignedTickets } from "@/endpoints";
import { cookies } from "next/headers";

export default async function Page() {
  const token = cookies().get("token")?.value;

  const tickets = await getAssignedTickets(token!);

  const getCardColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "unset":
        return "bg-[#EEF7FF] dark:bg-[#EEF7FF]/50";
      case "low":
        return "bg-[#FBAE32] dark:bg-[#FBAE32]/50 text-white";
      case "medium":
        return "bg-[#FC6D35] dark:bg-[#FC6D35]/50 text-white";
      default:
        return "bg-[#A12D49] dark:bg-[#A12D49]/50 text-white";
    }
  };

  return (
    <>
      <TabMutator availableTab={AvailableTabs["Assigned Tickets"]} />
      <section className="p-2 w-full flex justify-center flex-col gap-y-2">
        <div className="flex flex-col flex-wrap w-full gap-2 md:flex-row">
          {tickets && tickets.length > 0 ? (
            tickets.map((ticket) => (
              <TroubleCard
                classColor={getCardColor(ticket.priority)}
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
}
