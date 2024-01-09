import { cn } from "@/lib/utils";

interface TicketActivityProps {
  details?: string;
  created_at: string;
  created_time: string;
  activity_type?: string; //"update" | "assigned";
}

export default function TicketActivity({
  activity_type,
  created_at,
  created_time,
  details,
}: TicketActivityProps) {
  function getColor() {
    if (activity_type === "update") {
      return "border-s-indigo-800 from-indigo-200 dark:from-indigo-950";
    }

    return "border-s-green-800 from-green-200 dark:from-green-950";
  }

  return (
    <>
      <hr />
      <div
        className={cn(
          "flex flex-col gap-2 py-3 px-4 border-s-4 hover:border-s-8 transition-border duration-150 ease-in bg-gradient-to-r",
          getColor()
        )}
      >
        <h6 className="text-sm font-semibold">{details}</h6>
        <div className="flex gap-1 text-xs">
          <p>{created_at}</p>
          <p>||</p>
          <p>{created_time}</p>
        </div>
      </div>
    </>
  );
}
