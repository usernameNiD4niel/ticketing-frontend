import { columns } from "@/components/client/ticket-types/columns";
import { DataTable } from "@/components/client/ticket-types/data-table";
import TabMutator from "@/components/helper/tab-mutator";
import { AvailableTabs } from "@/constants/enums";
import { TicketTypeColumns } from "@/constants/types";
import { getTicketType } from "@/endpoints";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function TicketTypesPage() {
  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const data = (await getTicketType(token)) as TicketTypeColumns[];

  return (
    <div>
      <TabMutator
        availableTab={AvailableTabs["Ticket Types"]}
        key={"TicketTypesPage"}
      />
      <h1 className="w-full text-start text-lg">Ticket Type</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
