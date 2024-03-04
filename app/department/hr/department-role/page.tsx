import { getSpecifiedRole } from "@/endpoints";
import Content from "@/components/client/department-role/content";
import Selector from "@/components/client/hr/tab-mutator/selector";
import { AvailableTabs } from "@/constants/hr/enums";
import { cookies } from "next/headers";

const DepartmentRole = async () => {
  const token = cookies().get("token")?.value;
  const users = await getSpecifiedRole("unset", token!);
  return (
    <div className="w-full lg:py-8 xl:px-14 px-4 py-20 space-y-2 md:space-y-4">
      <Selector activeTab={AvailableTabs["Department Role"]} />
      <h1 className="font-bold text-lg md:text-2xl">Department Role</h1>
      <Content users={users} />
    </div>
  );
};

export default DepartmentRole;
