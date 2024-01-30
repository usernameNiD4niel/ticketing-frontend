import TableData from "@/components/client/manage-user/data-table";
import TabMutator from "@/components/helper/tab-mutator";
import { AvailableTabs } from "@/constants/enums";
import { getManageUser } from "@/endpoints";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import column from "./column";

export default async function ManageUser() {
  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const users = await getManageUser(token);

  return (
    <>
      <TabMutator
        availableTab={AvailableTabs["Manage User"]}
        key={"ManageUserPage"}
      />
      <TableData columns={column} data={users} />
    </>
  );
}
