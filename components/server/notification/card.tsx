import { Notifications } from "@/constants/types";
import { cn } from "@/lib/utils";
import { FaComment } from "react-icons/fa6";
import { GrUpdate } from "react-icons/gr";
import { MdAssignmentAdd } from "react-icons/md";

export default function CardNotification({
  created_at,
  is_seen,
  description,
  notification_type,
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
    <div
      className={cn(
        "w-full flex justify-between items-center p-3 rounded-md cursor-pointer",
        is_seen
          ? "border border-[#F1F1F1] bg-white"
          : "bg-[#F0EEEE] border border-[#F1F1F1]"
      )}
    >
      <p>
        <span>{getIcon()}</span>
        <span>{description}</span>
      </p>
      <p className="font-light">{created_at}</p>
    </div>
  );
}
