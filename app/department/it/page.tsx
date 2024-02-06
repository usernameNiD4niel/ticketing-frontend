import { columns } from "./table/columns";
import { DataTable } from "./table/data-table";
import ActiveTabFeed from "@/components/client/feed/ActiveTab";
import { cookies } from "next/headers";
import { getPaginatedData } from "@/endpoints";
import { getPaginatedFeedAction } from "@/app/actions";

export default async function DemoPage() {
  const token = cookies().get("token")?.value;
  const it_access_level = cookies().get("it_access_level")?.value;
  const isRequestor = it_access_level?.toLowerCase() === "requestor";

  if (isRequestor) {
    const newData = await getPaginatedFeedAction(true, 1);
    return (
      <div className="w-full md:container py-10">
        <DataTable
          columns={columns}
          data_={newData}
          next_page_url={0}
          pageCount={0}
          currentPage={1}
        />
        <ActiveTabFeed />
      </div>
    );
  }

  const data = await getPaginatedData(1, token!);

  return (
    <div className="w-full md:container py-10">
      <DataTable
        columns={columns}
        data_={data.data}
        next_page_url={data.next_page_url}
        pageCount={data.pageCount}
        currentPage={data.currentPage}
      />
      <ActiveTabFeed />
    </div>
  );
}
