import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cookies } from "next/headers";
import { IoMdAdd } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { ApplicationTypes } from "@/constants/types";
import { AvailableTabs } from "@/constants/hr/enums";
import Selector from "@/components/client/hr/tab-mutator/selector";
import ApplicationList from "@/components/server/hr/application/application-list";
import Content from "@/components/server/hr/application/Content";

const getApplications = async () => {
  const token = cookies().get("token");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/applications`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((data) => data.json())
    .then((data) => {
      const applications: ApplicationTypes[] = data.applications;
      return applications;
    })
    .catch((err) => {
      console.log(`the error is ${err}`);

      const applications: ApplicationTypes[] = [];
      return applications;
    });

  return response;
};

const Application = async () => {
  const applications = await getApplications();

  console.log(`APPLICATIONS ${applications}`);

  return (
    <div className="w-full py-8 px-14">
      <Selector activeTab={AvailableTabs.Application} />
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Application</h1>
        <div className="relative text-lg">
          <span className="absolute left-5 top-[1.09rem]">
            <CiSearch />
          </span>
          <Input
            placeholder="Search..."
            className="w-[380px] rounded-full bg-[#EDEDED] ps-11 py-6"
          />
        </div>
      </div>
      <div className="w-full grid grid-cols-[350px_1fr] gap-4 py-4">
        <ApplicationList />
        <Content />
      </div>
      <div className="fixed bottom-6 right-6">
        <Button className="text-white bg-[#879FFF] flex gap-1 rounded-md px-8 py-6 text-base hover:bg-[#7a90e7]">
          <span className="text-2xl">
            <IoMdAdd />
          </span>
          <span>Add</span>
        </Button>
      </div>
    </div>
  );
};

export default Application;

/**
 * https://firebasestorage.googleapis.com/v0/b/devex-inc.appspot.com/o/October%2025%2C%202023%2Fjerry-resume.pdf?alt=media&token=de668352-34d5-4dc0-8335-965a14ad7247
 */
