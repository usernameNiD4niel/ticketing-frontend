import Create from "@/components/client/locations/create";
import Edit from "@/components/client/locations/edit";
import TabMutator from "@/components/helper/tab-mutator";
import DisplayCard from "@/components/server/locations/display-cards";
import { AvailableTabs } from "@/constants/enums";

export default async function Page() {
  return (
    <div className="w-full flex ps-12">
      {/* IGNORE: this is just an empty fragment */}
      <TabMutator availableTab={AvailableTabs.Locations} />
      <div className="space-y-3">
        <h2 className="font-bold text-lg">Locations</h2>
        <DisplayCard />
      </div>
      <div className="w-full flex items-center justify-center flex-col gap-14 h-[80vh]">
        <Create />
        <div className="min-w-[690px] bg-slate-300 h-[1px]" />
        <Edit />
      </div>
    </div>
  );
}
