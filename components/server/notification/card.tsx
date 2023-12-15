import { Notifications } from "@/constants/types";
import { cn } from "@/lib/utils";
import { FaComment } from "react-icons/fa6";
import { cookies } from "next/headers";
import { MdAssignmentAdd, MdNotificationsActive } from "react-icons/md";
import Link from "next/link";
import { updateNotification } from "@/endpoints";

export default function CardNotification({
  created_at,
  is_seen,
  description,
  notification_type,
  ticket_id,
  id,
}: Notifications) {
  function getIcon() {
    switch (notification_type) {
      case "ticket comment":
        return <FaComment />;
      case "ticket assignment":
        return <MdAssignmentAdd />;
      default:
        return <MdNotificationsActive />;
    }
  }

  async function handleNotificationClick() {
    if (!is_seen) {
      const token = cookies().get("token")!.value;

      await updateNotification(token, id);
    }
  }

  return (
    <Link
      className={cn(
        "w-full flex flex-col md:flex-row md:justify-between gap-y-2 md:items-center p-6 rounded-md cursor-pointer",
        is_seen
          ? "border border-[#F1F1F1] bg-white"
          : "bg-[#F0EEEE] border border-[#F1F1F1]"
      )}
      href={`/department/it/${ticket_id}?tabName=Notification`}
      onClick={handleNotificationClick}
    >
      <p className="flex gap-2 flex-col md:flex-row">
        <span className="text-2xl text-[#0964B9]">{getIcon()}</span>
        <span className="text-sm">{description}</span>
      </p>
      <p className="font-light text-xs">{created_at}</p>
    </Link>
  );
}
