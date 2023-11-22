import { AvailableTabs } from "@/constants/enums";
import TabMutator from "@/components/helper/tab-mutator";
import { getPendingDepartmentRole } from "@/endpoints";
import { cookies } from "next/headers";
import Content from "@/components/client/department-role/content";

const PendingRole = async () => {
  const token = cookies().get("token")?.value;

  const users = await getPendingDepartmentRole(token!);

  if (!users) {
    return (
      <div className="w-full flex items-center justify-center h-[90vh]">
        <h2 className="text-sm">
          You&apos;re doing great! Continue handling all tickets well😉
        </h2>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="w-full flex items-center justify-center h-[90vh]">
        <h2 className="text-sm">
          You&apos;re doing great! Continue handling your department well😉
        </h2>
      </div>
    );
  }

  console.log(`the page`);

  return (
    <div className="flex gap-3 flex-wrap items-center justify-center md:justify-start">
      <TabMutator availableTab={AvailableTabs["Departments Role"]} />
      <Content users={users} />
    </div>
  );
};

export default PendingRole;
