import CreateTicketForm from "@/components/client/create-ticket/form";
import TabMutator from "@/components/helper/tab-mutator";
import { AvailableTabs } from "@/constants/enums";
import { getLocations } from "@/endpoints";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const CreateTicket = async () => {
  const token = cookies().get("token")?.value;
  const accessLevel = cookies().get("it_access_level")?.value;

  if (!token || !accessLevel) {
    redirect("/login");
  }
  const locations = (await getLocations(token, true)) as string[];

  return (
    <div className="w-full flex justify-center my-12 md:my-16 items-center h-[70vh]">
      <TabMutator availableTab={AvailableTabs["Create Ticket"]} />
      <CreateTicketForm
        locations={locations}
        accessLevel={accessLevel.toLowerCase()}
      />
    </div>
  );
};

export default CreateTicket;
