import { Button } from "../ui/button";
import { BsSearch } from "react-icons/bs";
import LeftSheet from "./LeftSheet";
import { FC } from "react";
import { AvailableTabs } from "@/constants/enums";
import Avatar from "react-avatar";
import Link from "next/link";

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
      <Link href="accounts/recent">
        {/* <BsSearch /> */}
        <Avatar name={name} size="35" round={true} />
      </Link>
    </>
  );
};

export default Header;
