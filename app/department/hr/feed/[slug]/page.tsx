import { SlugTypes } from "@/app/constants/types";
import Content from "@/components/helper/content";
import EditDialog from "@/components/helper/edit-dialog";
import Back from "@/components/server/hr/application/back";
import { getComments, getSpecifiedActivity } from "@/endpoints";
import { getStatusAndAssignTo } from "@/endpoints/requested-manpower";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function generateStaticParams() {
  const applications = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/manpower/ids`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((data) => data.json());

  const data: SlugTypes = applications;

  return data.slug.map((slug) => ({ slug: slug.toString() }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const token = cookies().get("token")?.value;
  const hr_access_level = cookies().get("hr_access_level")?.value;

  if (!token) {
    redirect("http://10.10.1.120:3000/login");
  }

  const statusAndAssignTo = await getStatusAndAssignTo(token!, slug);
  const comments = await getComments(token!, slug);
  const activities = await getSpecifiedActivity(slug, token!);

  const isAuthorizePerson = (): boolean => {
    if (hr_access_level === "unset" || hr_access_level === "requestor") {
      return false;
    }
    return true;
  };

  return (
    <>
      <div className="mt-20 md:mt-8 px-4 flex justify-center w-full gap-x-20">
        <div className="w-full max-w-4xl bg-white p-8 drop-shadow rounded-md mb-16">
          <Back />
          <Content slug={slug} />
        </div>
        <div className="w-full hidden md:flex md:max-w-[400px] flex-col">
          <RightSide comments={comments} id={slug} activities={activities} />
        </div>
      </div>
      {isAuthorizePerson() && (
        <div className="fixed bottom-4 right-5 md:bottom-8 md:right-24">
          <EditDialog statusAndAssignTo={statusAndAssignTo} id={slug} />
        </div>
      )}
    </>
  );
}
