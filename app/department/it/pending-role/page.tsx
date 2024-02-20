import { getPendingDepartmentRole } from "@/endpoints";
import { cookies } from "next/headers";
import { AvailableTabs } from "@/constants/enums";
import TabMutator from "@/components/helper/tab-mutator";
import TableData from "@/components/client/pending-overview/table-data";
import column from "@/components/client/pending-overview/column";

export default async function PendingRole() {
  const token = cookies().get("token")?.value;

  const users = await getPendingDepartmentRole(token!);

  return (
    <>
      <TabMutator
        availableTab={AvailableTabs["Departments Role"]}
        key={"PendingRolePage"}
      />
      <TableData columns={column} data={users} />
    </>
  );
}
