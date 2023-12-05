import { Locations } from "@/constants/types";

interface DisplayCardProps {
  locations: Locations[];
}

export default function DisplayCard({ locations }: DisplayCardProps) {
  return locations && locations.length > 0 ? (
    locations.map((location) => (
      <div className="w-full md:w-80 bg-[#EEF7FF] dark:bg-[#1A1919] p-7 rounded-md flex justify-around flex-col drop-shadow">
        <h3 className="font-bold text-sm">{location.location}</h3>
        <div className="font-light text-xs mt-2 space-y-1">
          <p>Created: {location.created_at}</p>
          <p>Updated: {location.updated_at}</p>
        </div>
      </div>
    ))
  ) : (
    <div className="w-full md:w-80 text-sm h-40 rounded-md flex bg-[#EEF7FF] dark:bg-[#1A1919] justify-center items-center flex-col">
      No location found
    </div>
  );
}
