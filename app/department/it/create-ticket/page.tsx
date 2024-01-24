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

  return (
    <div className="w-full flex justify-center my-12 md:my-16 items-center h-[70vh]">
      <TabMutator availableTab={AvailableTabs["Create Ticket"]} />
      <div className="w-full md:max-w-2xl px-4">
        <h1 className="text-2xl font-bold">Create trouble ticket</h1>
        {accessLevel.toLowerCase() === "requestor" && (
          <div className="w-full rounded-md bg-yellow-500 p-5 text-sm my-2 text-black">
            <p>
              Hi, to limit the number of ticket posted per day. Everyday you can
              only post 3 tickets per day. Status:{" "}
              <span className="font-bold">1 of 3</span>
            </p>
          </div>
        )}
        <CreateTicketForm
          locations={locations}
          accessLevel={accessLevel.toLowerCase()}
          users={users}
          ticket_types={ticket_types}
        />
      </div>
    </div>
  );
};

export default CreateTicket;
