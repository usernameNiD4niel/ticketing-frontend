import { columns } from "@/components/client/feed/column";
import Header from "@/components/client/feed/header";
import Selector from "@/components/client/hr/tab-mutator/selector";
import { AvailableTabs } from "@/constants/hr/enums";
import { getPaginatedData } from "@/endpoints/requested-manpower";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import React from "react";

const TableData = dynamic(() => import("@/components/client/feed/content"), {
  loading: () => <p>Loading...</p>,
});

const Feed = async () => {
  const token = cookies().get("token")?.value;

  const data = await getPaginatedData(token!, 1);

  return (
    <div className="w-full lg:py-8 xl:px-14 px-4 py-20 space-y-2 md:space-y-4">
      <Selector activeTab={AvailableTabs.Feed} />
      <Header />
      <TableData
        columns={columns}
        data_={data.data}
        next_url_page={data.next_page_url}
      />
    </div>
  );
};

export default Feed;
