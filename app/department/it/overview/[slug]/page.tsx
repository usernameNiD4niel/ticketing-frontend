import BreadCrumbs from "@/components/client/overview/bread-crumbs";
import CSVDownloader from "@/components/client/overview/csv-downloader";
import { getChampionPerformanceItem } from "@/endpoints";
import { cn } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CSVLink } from "react-csv";

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

  if (!champions) {
    return (
      <div className="w-full flex h-[90vh] items-center justify-center">
        <p>
          No champion was selected, please try to select a person in the list
        </p>
      </div>
    );
  }

  function getColor(isBg?: boolean) {
    const rate = champions.resolution_rate;

    let bg = "bg";

    if (!isBg) {
      bg = "text";
    }

    if (rate >= 50) {
      return `${bg}-green-500`;
    }

    if (rate >= 30 && rate <= 49) {
      return `${bg}-orange-500`;
    }

    return `${bg}-red-500`;
  }

  return (
    <div className="md:container space-y-3 text-lg">
      <BreadCrumbs />
      <div className="w-full flex justify-end">
        <h2 className={cn("text-6xl font-bold px-4", getColor())}>
          {champions.resolution_rate}%
        </h2>
      </div>
      <p className="px-6 text-4xl font-medium">{params.slug.toUpperCase()}</p>
      <p className="px-6">
        Date Covered: <span>ALL</span>
      </p>
      <p
        className={cn(
          "px-6 pt-8 flex items-center justify-between hover:text-2xl hover:font-bold transition-text duration-150 ease-in",
          getColor()
        )}
      >
        <span>No of Tickets Assigned:</span>{" "}
        <span>{champions.ticket_count}</span>
      </p>
      <p className="px-6 flex items-center justify-between hover:text-2xl hover:font-bold transition-text duration-150 ease-in">
        Open: <span>{champions.open_ticket_count}</span>
      </p>
      <p
        className={cn(
          "px-6 flex items-center justify-between hover:text-2xl hover:font-bold transition-text duration-150 ease-in",
          getColor()
        )}
      >
        Closed: <span>{champions.closed_ticket_count}</span>
      </p>
      <p className="px-6 flex items-center justify-between hover:text-2xl hover:font-bold transition-text duration-150 ease-in">
        Cancelled: <span>{champions.cancelled_ticket_count}</span>
      </p>
      <hr />
      <p
        className={cn(
          "px-6 flex items-center justify-between text-2xl font-bold",
          getColor()
        )}
      >
        Resolution Rate: <span>{champions.resolution_rate}</span>
      </p>
      <div className="flex w-full justify-end pt-10 pl-4">
        <CSVDownloader
          champions={champions}
          championName={params.slug}
          color={getColor(true)}
        />
      </div>
    </div>
  );
}
