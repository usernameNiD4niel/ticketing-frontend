import TabMutator from "@/components/helper/tab-mutator";
import CardNotification from "@/components/server/notification/card";
import { Button } from "@/components/ui/button";
import { AvailableTabs } from "@/constants/enums";
import getNotification from "@/endpoints/getNotification";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function NotificationPage() {
  //! create an endpoint for pulling all of the notification for the user...
  const token = cookies().get("token")?.value;
  const email = cookies().get("email")?.value;

  if (!token || !email) {
    redirect("/login");
  }

  const notifications = await getNotification(token, email);

  return (
    <>
      <TabMutator availableTab={AvailableTabs.Notification} />
      <div className="w-full">
        <div className="w-full flex justify-between items-center">
          <h2>Notification</h2>
          <Button variant={"link"}>Filter</Button>
        </div>

        {notifications && notifications.length > 0 ? (
          notifications.map((notification) => (
            <CardNotification
              created_at={notification.created_at}
              is_seen={notification.is_seen}
              description={notification.description}
              notification_type={notification.notification_type}
              key={notification.created_at}
            />
          ))
        ) : (
          <div className="h-[80vh] w-full flex items-center justify-center">
            <p>No notification yet</p>
          </div>
        )}
      </div>
    </>
  );
}
