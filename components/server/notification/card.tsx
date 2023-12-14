import { Notifications } from "@/constants/types";
import { cn } from "@/lib/utils";
import { FaComment } from "react-icons/fa6";
import { GrUpdate } from "react-icons/gr";
import { MdAssignmentAdd } from "react-icons/md";
import Link from "next/link";

export default function CardNotification({
  created_at,
  is_seen,
  description,
  notification_type,
  ticket_id,
}: Notifications) {
  function getIcon() {
    switch (notification_type) {
      case "ticket comment":
        return <FaComment />;
      case "ticket assignment":
        return <MdAssignmentAdd />;
      default:
        return <GrUpdate />;
    }
  }

  return (
    <Link
      className={cn(
        "w-full flex justify-between items-center p-4 rounded-md cursor-pointer",
        is_seen
          ? "border border-[#F1F1F1] bg-white"
          : "bg-[#F0EEEE] border border-[#F1F1F1]"
      )}
      href={`/department/it/${ticket_id}?tabName=Feed`}
    >
      <p className="flex gap-1">
        <span className="text-lg text-[#0964B9]">{getIcon()}</span>
        <span className="text-sm">{description}</span>
      </p>
      <p className="font-light text-xs">{created_at}</p>
    </Link>
  );
}
