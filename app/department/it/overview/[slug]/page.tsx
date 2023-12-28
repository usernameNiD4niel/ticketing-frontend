import BreadCrumbs from "@/components/client/overview/bread-crumbs";
import { getChampionPerformanceItem } from "@/endpoints";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DynamicOverviewPage({
  params,
}: {
  params: { slug: string };
}) {
  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const champions = await getChampionPerformanceItem(token, params.slug);

  return (
    <div className="md:container">
      <BreadCrumbs />
      <div className="w-full flex justify-end">
        <h2 className="text-4xl font-bold">{champions.resolution_rate}%</h2>
      </div>
      <p>
        Date Covered: <span>ALL</span>
      </p>
      <p>
        No of Tickets Assigned: <span>{champions.ticket_count}</span>
      </p>
      <p>
        Open: <span>{champions.open_ticket_count}</span>
      </p>
      <p>
        Closed: <span>{champions.closed_ticket_count}</span>
      </p>
      <p>
        Cancelled: <span>{champions.cancelled_ticket_count}</span>
      </p>
      <hr />
      <div className="w-full flex items-center">
        <p>Resolution Rate: {champions}</p>
      </div>
    </div>
  );
}
