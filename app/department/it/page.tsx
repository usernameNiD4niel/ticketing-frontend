import { columns } from "./table/columns";
import { DataTable } from "./table/data-table";
import ActiveTabFeed from "@/components/client/feed/ActiveTab";
import { cookies } from "next/headers";
import { getPaginatedData } from "@/endpoints";

export default async function DemoPage() {
  const token = cookies().get("token")?.value;

  const data = await getPaginatedData(1, token!);

  return (
    <div className="w-full md:container py-10">
      <DataTable
        columns={columns}
        data_={data.data}
        next_page_url={data.next_page_url}
      />
      <ActiveTabFeed />
    </div>
  );
}
