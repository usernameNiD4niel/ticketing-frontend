import { columns } from "@/components/client/code/columns";
import { DataTable } from "@/components/client/code/data-table";
import Tabs from "@/components/client/code/tabs";
import { getCodes } from "@/endpoints";
import { cookies } from "next/headers";

const Code = async () => {
  const token = cookies().get("token")?.value;

  const data = await getCodes(token!);

  return (
    <div>
      <Tabs />
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Code;
