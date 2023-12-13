import TabMutator from "@/components/helper/tab-mutator";
import CardNotification from "@/components/server/notification/card";
import { Button } from "@/components/ui/button";
import { AvailableTabs } from "@/constants/enums";

export default function NotificationPage() {
  //! create an endpoint for pulling all of the notification for the user...
  return (
    <>
      <TabMutator availableTab={AvailableTabs.Notification} />
      <div className="w-full">
        <div className="w-full flex justify-between items-center">
          <h2>Notification</h2>
          <Button variant={"link"}>Filter</Button>
        </div>
        <CardNotification
          created_at="1212"
          is_seen={false}
          message="dkasidjasjdkas kasdkasd"
          notification_type="ticket comment"
          key={1}
        />
        <CardNotification
          created_at="1212"
          is_seen={false}
          message="dkasidjasjdkas kasdkasd"
          notification_type="ticket comment"
          key={2}
        />
        <CardNotification
          created_at="1212"
          is_seen={true}
          message="dkasidjasjdkas kasdkasd"
          notification_type="ticket update"
          key={3}
        />
        <CardNotification
          created_at="1212"
          is_seen={false}
          message="dkasidjasjdkas kasdkasd"
          notification_type="ticket update"
          key={4}
        />
      </div>
    </>
  );
}
