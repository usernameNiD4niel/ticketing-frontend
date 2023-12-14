import TabMutator from "@/components/helper/tab-mutator";
import CardNotification from "@/components/server/notification/card";
import { Button } from "@/components/ui/button";
import { AvailableTabs } from "@/constants/enums";
import { getNotification } from "@/endpoints";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function NotificationPage() {
  const token = cookies().get("token")?.value;
  const email = cookies().get("email")?.value;

  if (!token || !email) {
    redirect("/login");
  }

  const notifications = await getNotification(token, email);

  return (
    <div className="w-full flex gap-2 justify-center px-2">
      <TabMutator availableTab={AvailableTabs.Notification} />
      <div className="w-full md:max-w-4xl space-y-2">
        <div className="w-full flex justify-between items-center">
          <h2 className="font-bold text-lg">Notification</h2>
          {notifications && notifications.length > 0 && (
            <Button variant={"link"} className="p-0">
              Filter
            </Button>
          )}
        </div>

        {notifications && notifications.length > 0 ? (
          notifications.map((notification) => (
            <CardNotification
              created_at={notification.created_at}
              is_seen={notification.is_seen}
              description={notification.description}
              notification_type={notification.notification_type}
              ticket_id={notification.ticket_id}
              key={notification.created_at}
            />
          ))
        ) : (
          <div className="h-[80vh] w-full flex items-center justify-center">
            <p className="text-sm">No notification yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
