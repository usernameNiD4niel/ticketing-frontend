import { cookies } from "next/headers";
import Selector from "@/components/client/hr/tab-mutator/selector";
import { AvailableTabs } from "@/constants/hr/enums";
import { ApplicationTypes } from "@/constants/hr/types";
import UI from "@/components/ui/search";
import AddApplication from "@/components/server/hr/application/add-application";
import Body from "@/components/server/hr/application/body";

const getApplications = async () => {
  const token = cookies().get("token")?.value;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/applications`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    const applications: ApplicationTypes[] = data.applications;
    return applications;
  }

  throw new Error("Error fetching the applications");
};

const Application = async () => {
  const application = await getApplications();

  return (
    <div className="w-full lg:py-8 xl:px-14 px-4 py-20">
      <Selector activeTab={AvailableTabs.Application} />
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Application</h1>
        <UI />
      </div>
      <div className="w-full grid lg:grid-cols-[200px_1fr] xl:grid-cols-[350px_1fr] gap-4 py-4">
        <Body application={application} />
      </div>
      <div className="fixed bottom-6 right-2 lg:right-6">
        <AddApplication application={null} />
      </div>
    </div>
  );
};

export default Application;
