"use client";
import React, { useEffect } from "react";
import { logout, menu } from "@/constants/hr/objects";
import MenuButton from "./menu-button";
import { AvailableTabs } from "@/constants/hr/enums";
import useNavigateStore from "@/hooks/hr/useNavigationStore";
import useNavigationActivityCount from "@/hooks/hr/useNavigationCount";

interface DisplayMenuProps {
  drCount: number;
  rmCount: number;
}

const DisplayMenu = ({ drCount, rmCount }: DisplayMenuProps) => {
  const [activeTab] = useNavigateStore((state) => [state.activeTab]);
  const [
    departmentRoleCount,
    requestedManpowerCount,
    setDepartmentRoleCount,
    setRequestedManpowerCount,
  ] = useNavigationActivityCount((state) => [
    state.departmentRoleCount,
    state.requestedManpowerCount,
    state.setDepartmentRoleCount,
    state.setRequestedManpowerCount,
  ]);

  useEffect(() => {
    setDepartmentRoleCount(drCount);
    setRequestedManpowerCount(rmCount);
  }, []);

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
            departmentCount={departmentRoleCount}
            rmCount={requestedManpowerCount}
            key={index}
          />
        ))}
      </div>
      <MenuButton
        isActive={getActive() === "logout"}
        menuObject={logout}
        departmentCount={departmentRoleCount}
        rmCount={requestedManpowerCount}
      />
    </>
  );
};

export default DisplayMenu;
