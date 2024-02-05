import DisplayButton from "@/components/client/manage-user/display-button";
import FormManageUserItem from "@/components/client/manage-user/form-manage-user-item";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import RedirectBack from "@/components/utils/RedirectBack";
import { getSpecificUser } from "@/endpoints";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ManageUserSlugPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const { name, department, email, role, account_status } =
    await getSpecificUser(token, slug);

  console.log(`name ${name}`);
  function formatName(): string {
    const splittedName = name.split(" ");
    const length = splittedName.length;

    if (length > 1) {
      return `${name.substring(0, 1)}${splittedName[length - 1].substring(
        0,
        1
      )}`.toUpperCase();
    }
    return name.substring(0, 1).toUpperCase();
  }

  return (
    <div className="p-5 w-full relative">
      <RedirectBack />
      <div className="w-full flex gap-4 flex-col justify-center items-center my-10">
        <Avatar className="text-2xl font-bold text-white p-12 bg-[#0964B9]">
          <AvatarFallback>{formatName().toUpperCase()}</AvatarFallback>
        </Avatar>
        <h1 className="capitalize text-2xl">{name}</h1>
      </div>
      <div className="fixed top-4 right-2">
        <DisplayButton
          isDeactivated={
            account_status.toLowerCase() === "active" ? false : true
          }
        />
      </div>
      <div className="w-full flex items-center justify-center h-[35vh]">
        <FormManageUserItem
          department={department}
          email={email}
          role={role.toUpperCase()}
          id={slug}
        />
      </div>
    </div>
  );
}
