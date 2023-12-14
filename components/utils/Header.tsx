import LeftSheet from "./LeftSheet";
import { FC } from "react";
import LogoutDropDown from "./LogoutDropDown";
import { cookies } from "next/headers";

type HeaderProps = {
  unhandledTicketsCount: number;
  pendingRoleCount: number;
  myAssignedTickets: number;
  count: number;
};

const Header: FC<HeaderProps> = ({
  pendingRoleCount,
  unhandledTicketsCount,
  myAssignedTickets,
  count,
}) => {
  const name = cookies().get("name")?.value;
  const role = cookies().get("it_access_level")?.value;

  return (
    <>
      <LeftSheet
        unhandledTicketsCount={unhandledTicketsCount}
        pendingRoleCount={pendingRoleCount}
        myAssignedTickets={myAssignedTickets}
        count={count}
        role={role!}
      />

      <LogoutDropDown name={name!} />
    </>
  );
};

export default Header;
