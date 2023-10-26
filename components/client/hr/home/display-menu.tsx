"use client";
import React from "react";
import { logout, menu } from "@/constants/objects";
import MenuButton from "@/components/server/hr/home/menu-button";
import { AvailableTabs } from "@/constants/hr/enums";
import useNavigateStore from "@/hooks/hr/useNavigationStore";

const DisplayMenu = () => {
  const [activeTab] = useNavigateStore((state) => [state.activeTab]);

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
    <>
      <div className="flex flex-col w-full gap-y-3">
        {menu.map((_, index) => (
          <MenuButton
            isActive={getActive() === _.text.toLowerCase()}
            menuObject={_}
            key={index}
          />
        ))}
      </div>
      <MenuButton isActive={getActive() === "logout"} menuObject={logout} />
    </>
  );
};

export default DisplayMenu;
