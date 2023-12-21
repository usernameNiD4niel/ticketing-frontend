"use client";
import CardNotification from "@/components/server/notification/card";
import { Notifications } from "@/constants/types";
import FilterDropdown from "./filter-dropdown";
import { useState } from "react";

interface DisplayNotificationProps {
  notifications: Notifications[];
}

export default function DisplayNotification({
  notifications,
}: DisplayNotificationProps) {
  const [notif, setNotif] = useState(notifications);

  return (
    <>
      <div className="w-full flex justify-between items-center">
        <h2 className="font-bold text-lg">Notification</h2>
        {notif && notif.length > 0 && (
          <FilterDropdown setNotif={setNotif} notif={notif} />
        )}
      </div>

      {notif && notif.length > 0 ? (
        notif.map((notification, index) => (
          <CardNotification
            created_at={notification.created_at}
            is_seen={notification.is_seen}
            description={notification.description}
            notification_type={notification.notification_type}
            ticket_id={notification.ticket_id}
            key={`${notification.created_at}${index}`}
            id={notification.id}
          />
        ))
      ) : (
        <div className="h-[80vh] w-full flex items-center justify-center">
          <p className="text-sm">No notification yet</p>
        </div>
      )}
    </>
  );
}
