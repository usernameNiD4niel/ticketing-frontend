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
    <div>
      <pre>{JSON.stringify(champions, null, 2)}</pre>
    </div>
  );
}
