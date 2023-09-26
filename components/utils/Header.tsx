import { Button } from "../ui/button";
import { BsSearch } from "react-icons/bs";
import LeftSheet from "./LeftSheet";
import { FC } from "react";
import { AvailableTabs } from "@/constants/enums";

type HeaderProps = {
  isDrawerOpen: boolean;
  unhandledTicketsCount: number;
  pendingRoleCount: number;
  activeTab: AvailableTabs;
  role?: string;
};

const Header: FC<HeaderProps> = ({
  isDrawerOpen,
  pendingRoleCount,
  unhandledTicketsCount,
  activeTab,
  role,
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
      <h1 className="font-bold">Head</h1>
      <Button variant="outline">
        <BsSearch />
      </Button>
    </>
  );
};

export default Header;
