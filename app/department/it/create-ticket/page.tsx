import CreateTicketForm from "@/components/client/create-ticket/form";
import TabMutator from "@/components/helper/tab-mutator";
import { AvailableTabs } from "@/constants/enums";
import { getCreateTicketType, getLocations, getUsersName } from "@/endpoints";
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

  console.log(`the ticket types ::: ${JSON.stringify(ticket_types, null, 2)}`);

  return (
    <div className="w-full flex justify-center my-12 md:my-16 items-center h-[70vh]">
      <TabMutator availableTab={AvailableTabs["Create Ticket"]} />
      <CreateTicketForm
        locations={locations}
        accessLevel={accessLevel.toLowerCase()}
        users={users}
        ticket_types={ticket_types}
      />
    </div>
  );
};

export default CreateTicket;
