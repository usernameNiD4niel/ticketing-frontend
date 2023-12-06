import { Badge } from "@/components/ui/badge";
import { AvailableTabs } from "@/constants/enums";
import DialogBoxAlert from "@/components/server/logout/DialogBoxAlert";
import TabMutator from "@/components/helper/tab-mutator";
import { getAccount } from "@/endpoints";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ManageTab from "@/components/client/accounts/manage-tab";
import { FC } from "react";
import { AccountProps } from "@/constants/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type AccountLayoutProps = {
  children: React.ReactNode;
};

const AccountLayout: FC<AccountLayoutProps> = async ({ children }) => {
  const token = cookies().get("token")?.value;
  const email = cookies().get("email")?.value;

  if (!token || !email) {
    redirect("/login");
  }

  const account = await getAccount(token, email);

  const getAccessLevel = (
    account: AccountProps
  ): "requestor" | "champion" | "catalyst" | "supreme" => {
    const access = account.access_level.it_access_level.toString();

    switch (access) {
      case "requestor":
      case "unset":
        return "requestor";
      case "champion":
        return "champion";
      case "catalyst":
        return "catalyst";
    }

    return "supreme";
  };

  const formatName = () => {
    const splitName = account.name.split(" ");
    if (splitName.length > 1) {
      return `${splitName[0].substring(0, 1)}${splitName[1].substring(0, 1)}`;
    }

    return splitName[0].substring(0, 1);
  };

  return (
    <>
      <TabMutator availableTab={AvailableTabs.Accounts} key={"Accounts"} />
      <main className="w-full">
        <section className="w-full flex items-center justify-center flex-col gap-y-3">
          {/* <Avatar name={account.name} size="150" round={true} /> */}
          <Avatar className="text-2xl font-bold text-white p-12 bg-[#0964B9]">
            <AvatarFallback>{formatName().toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex gap-y-1 items-center justify-center flex-col">
            <Badge variant={getAccessLevel(account)}>
              {account.access_level.it_access_level.toUpperCase()}
            </Badge>
            <h2 className="text-2xl font-bold">{account.name}</h2>
            <p>{account.department}</p>
            <p className="text-sm underline underline-offset-1">
              @{account.email}
            </p>
            <p className="text-sm">
              Joined On: {account.created_at} - {account.created_time}
            </p>
          </div>
        </section>
        <ul className="flex gap-x-2 items-center border-b-[1px] justify-center border-b-[#ccc] py-3 mt-10 dark:border-b-[#ccc]/20 flex-wrap">
          <ManageTab />
        </ul>
        <section>{children}</section>
      </main>
      <footer className="fixed bottom-4 right-4 md:top-8 md:right-10">
        <DialogBoxAlert isInTheMenu={false} key={"AccountLogout"} />
      </footer>
    </>
  );
};

export default AccountLayout;
