import React, { FC } from "react";
import AccountRecent from "@/components/utils/AccountRecent";
import UpdatePassword from "@/components/utils/UpdatePassword";
import EditProfile from "@/components/server/accounts/EditProfile";
import { getCookies } from "next-client-cookies/server";

type AccountTabProps = {
  params: { slug: string };
};

const AccountTab: FC<AccountTabProps> = ({ params }) => {
  let contentTab = null;

  const token = getCookies().get("token");
  const email = getCookies().get("email");

  if (!token || !email) {
    contentTab = <div>Please withdraw your self!</div>;
  } else if (params.slug === "recent") {
    contentTab = <AccountRecent token={token} email={email} />;
  } else if (params.slug === "edit-profile") {
    contentTab = <EditProfile />;
  } else {
    contentTab = <UpdatePassword token={token} email={email} />;
  }

  return <div className="my-5 mx-3 text-xs md:text-sm">{contentTab}</div>;
};

export default AccountTab;
