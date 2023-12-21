import DisplayNotification from "@/components/client/notification/display-notification";
import TabMutator from "@/components/helper/tab-mutator";
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
    <div className="w-full flex gap-2 justify-center px-2 pb-10">
      <TabMutator availableTab={AvailableTabs.Notification} />
      <div className="w-full md:max-w-4xl space-y-2">
        <DisplayNotification notifications={notifications} />
      </div>
    </div>
  );
}
