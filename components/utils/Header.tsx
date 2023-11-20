import LeftSheet from "./LeftSheet";
import { FC } from "react";
import LogoutDropDown from "./LogoutDropDown";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type HeaderProps = {
  unhandledTicketsCount: number;
  pendingRoleCount: number;
};

const Header: FC<HeaderProps> = ({
  pendingRoleCount,
  unhandledTicketsCount,
}) => {
  const name = cookies().get("name")?.value;
  const role = cookies().get("it_access_level")?.value;

  return (
    <>
      <LeftSheet
        unhandledTicketsCount={unhandledTicketsCount}
        pendingRoleCount={pendingRoleCount}
        role={role!}
      />

      <LogoutDropDown name={name!} />
    </>
  );
};

export default Header;
