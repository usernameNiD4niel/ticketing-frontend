import LeftSheet from "./LeftSheet";
import { FC } from "react";
import { AvailableTabs } from "@/constants/enums";
import LogoutDropDown from "./LogoutDropDown";

type HeaderProps = {
  isDrawerOpen: boolean;
  unhandledTicketsCount: number;
  pendingRoleCount: number;
  activeTab: AvailableTabs;
  role?: string;
  name: string;
  tab: string;
};

const Header: FC<HeaderProps> = ({
  isDrawerOpen,
  pendingRoleCount,
  unhandledTicketsCount,
  activeTab,
  role,
  name,
  tab,
}) => {
  return (
    <>
      <LeftSheet
        isDrawerOpen={isDrawerOpen}
        unhandledTicketsCount={unhandledTicketsCount}
        pendingRoleCount={pendingRoleCount}
        activeTab={activeTab}
        role={role}
      />
      <h1 className="font-bold">{tab}</h1>
      <LogoutDropDown name={name} />
    </>
  );
};

export default Header;
