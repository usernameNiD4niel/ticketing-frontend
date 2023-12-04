import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getLocations } from "@/endpoints";

export default async function DisplayCard() {
  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const locations = await getLocations(token);

  return locations && locations.length > 0 ? (
    locations.map((location) => (
      <div className="w-full md:w-80 bg-[#EEF7FF] dark:bg-[#1A1919] px-3 rounded-md flex justify-around flex-col">
        <h3 className="font-bold">{location.location}</h3>
        <div className="font-light text-sm">
          <p>{location.created_at}</p>
          <p>{location.updated_at}</p>
        </div>
      </div>
    ))
  ) : (
    <div className="w-full md:w-80 text-sm h-40 rounded-md flex bg-[#EEF7FF] dark:bg-[#1A1919] justify-center items-center flex-col">
      No location found
    </div>
  );
}
