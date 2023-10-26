import Link from "next/link";
import React, { FC } from "react";
import { AvailableTabs } from "@/constants/hr/enums";
import { logout, menu } from "@/constants/objects";
import MobileMenuButton from "./mobile-menu-button";

interface MenuProps {
  activeTab: AvailableTabs;
}

const MobileMenu: FC<MenuProps> = ({ activeTab }) => {
  const getActive = () => {
    switch (activeTab) {
      case AvailableTabs.Dashboard:
        return "dashboard";
      case AvailableTabs.Application:
        return "application";
      case AvailableTabs["Department Role"]:
        return "department role";
      case AvailableTabs.Feed:
        return "feed";
      case AvailableTabs["Requested Manpower"]:
        return "requested manpower";
      default:
        return "logout";
    }
  };

  return (
    <div className="flex flex-col pb-4 md:pb-0 pt-16 items-center w-full md:px-6 gap-y-6 h-screen">
      <Link href={"http://10.10.1.120:3000"} className="font-bold text-4xl">
        <span className="text-[#0B64B9]">OP</span>
        <span className="text-[#99CC68]">PA</span>
      </Link>
      <ul className="w-full flex flex-col my-6 justify-between h-full">
        <div className="flex flex-col w-full gap-y-3">
          {menu.map((_, index) => (
            <MobileMenuButton
              isActive={getActive() === _.text.toLowerCase()}
              menuObject={_}
              key={index}
            />
          ))}
        </div>
        <MobileMenuButton
          isActive={getActive() === "logout"}
          menuObject={logout}
        />
      </ul>
    </div>
  );
};

export default MobileMenu;
