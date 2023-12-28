import { Button } from "@/components/ui/button";
import ChampionCarousel from "./champion-carousel";
import { getChampionPerformance } from "@/endpoints";
import { cookies } from "next/headers";
import TrackProgressForm from "./track-progress-form";
import { DatePickerDemo } from "./date-range-picker";

export default async function ChampionBody() {
  const token = cookies().get("token")?.value;
  const champions = await getChampionPerformance(token!);
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full flex justify-between p-2 items-center">
        <h2 className="text-lg font-bold">Overall Performance</h2>
        <div className="flex items-center gap-2">
          {champions.length > 3 && <Button variant={"link"}>View All</Button>}
          <TrackProgressForm />
        </div>
      </div>
      <div className="w-full">
        <ChampionCarousel champions={champions} />
      </div>
    </div>
  );
}
