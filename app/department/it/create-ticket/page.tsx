import CreateTicketForm from "@/components/client/create-ticket/form";
import TabMutator from "@/components/helper/tab-mutator";
import { AvailableTabs } from "@/constants/enums";
import { getLocations } from "@/endpoints";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const CreateTicket = async () => {
  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/login");
  }
  const locations = (await getLocations(token, true)) as string[];

  return (
    <div className="w-full flex justify-center my-12 md:my-16 items-center h-[70vh]">
      <TabMutator availableTab={AvailableTabs["Create Ticket"]} />
      <CreateTicketForm locations={locations} />
    </div>
  );
};

export default CreateTicket;
