import Link from "next/link";
import Create from "@/components/client/locations/create";
import Edit from "@/components/client/locations/edit";
import TabMutator from "@/components/helper/tab-mutator";
import DisplayCard from "@/components/server/locations/display-cards";
import { AvailableTabs } from "@/constants/enums";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getLocations } from "@/endpoints";
import { Locations } from "@/constants/types";

export default async function Page() {
  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const locations = (await getLocations(token, false)) as Locations[];

  return (
    <div className="w-full flex px-3 md:ps-12 flex-col md:flex-row gap-20">
      {/* IGNORE: this is just an empty fragment */}
      <TabMutator availableTab={AvailableTabs.Locations} />

      {/* Locations List */}
      <div className="space-y-3">
        <h2 className="font-bold text-lg" id="location">
          Locations
        </h2>
        <div className="space-y-2 overflow-y-auto max-h-[800px]">
          <DisplayCard locations={locations} />
        </div>
      </div>

      {/* On PC */}
      <div className="w-full items-center justify-center flex-col gap-14 mt-10 h-[80vh]">
        <Create />
        <div className="w-full md:w-[690px] bg-slate-300 h-[1px] my-8" />
        <Edit locations={locations && locations.length > 0 ? locations : []} />
      </div>

      {/* On Mobile */}
      <div className="fixed bottom-3 right-2 flex flex-col gap-2 md:hidden">
        <Link
          href={"#location"}
          className={
            "rounded-full bg-[#0B64B9] hover:bg-blue-900 p-4 text-center text-white text-xl"
          }
        >
          <IoIosArrowUp />
        </Link>
        <Link
          href={"#update-button"}
          className={
            "rounded-full bg-[#0B64B9] hover:bg-blue-900 p-4 text-center text-white text-xl"
          }
        >
          <IoIosArrowDown />
        </Link>
      </div>
    </div>
  );
}
