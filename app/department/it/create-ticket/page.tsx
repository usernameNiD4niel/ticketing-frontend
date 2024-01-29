import CreateTicketForm from "@/components/client/create-ticket/form";
import TabMutator from "@/components/helper/tab-mutator";
import { AvailableTabs } from "@/constants/enums";
import { getCreateTicketType, getLocations, getUsersName } from "@/endpoints";
import { getTicketTodayCount } from "@/endpoints";
import { cn } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const CreateTicket = async () => {
  const token = cookies().get("token")?.value;
  const accessLevel = cookies().get("it_access_level")?.value;

  if (!token || !accessLevel) {
    redirect("/login");
  }
  const locations = (await getLocations(token, true)) as string[];
  const users = await getUsersName(token);
  const ticket_types = await getCreateTicketType(token);
  const ticket_count = await getTicketTodayCount(token);

  return (
    <div className="w-full flex justify-center my-12 md:my-16 items-center h-[70vh]">
      <TabMutator availableTab={AvailableTabs["Create Ticket"]} />
      <div className="w-full md:max-w-2xl px-4">
        <h1 className="text-2xl font-bold">Create trouble ticket</h1>
        {accessLevel.toLowerCase() === "requestor" && (
          <div
            className={cn(
              "w-full rounded-md p-5 text-sm my-2",
              ticket_count.ticket_count >= 3
                ? "bg-red-500 text-white"
                : "bg-yellow-500 text-black"
            )}
          >
            <p>
              Hi, to limit the number of ticket posted. You can only create a
              ticket if you have less than 3 open tickets. Opened tickets{" "}
              <span className="font-bold">
                {ticket_count.ticket_count} of 3
              </span>
            </p>
          </div>
        )}
        <CreateTicketForm
          locations={locations}
          accessLevel={accessLevel.toLowerCase()}
          users={users}
          ticket_types={ticket_types}
          ticket_count={ticket_count.ticket_count}
        />
      </div>
    </div>
  );
};

export default CreateTicket;
