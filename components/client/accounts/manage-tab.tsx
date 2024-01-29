"use client";

import { ProfileTabProps } from "@/constants/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ManageTab() {
  const ProfileTabs: ProfileTabProps[] = [
    // {
    //   displayText: "Recent",
    //   isActive: true,
    //   route: "recent",
    //   onClick: () => handleTabClick("recent"),
    // },
    // {
    //   displayText: "Edit Profile",
    //   isActive: false,
    //   route: "edit-profile",
    //   onClick: () => handleTabClick("edit-profile"),
    // },
    {
      displayText: "Update Password",
      isActive: true,
      route: "update-password",
      onClick: () => handleTabClick("update-password"),
    },
  ];

  useEffect(() => {
    // Get the current URL pathname and set the active tab based on it
    const splittedPath = window.location.pathname.split("/");
    let currentPathname = splittedPath[splittedPath.length - 1];

    const updatedTabs = tabs.map((tab) => ({
      ...tab,
      isActive: tab.route === currentPathname,
    }));

    setTabs(updatedTabs);
  }, []);

  const [tabs, setTabs] = useState<ProfileTabProps[]>(ProfileTabs);

  const handleTabClick = (clickRoute: string) => {
    const updatedTabs = tabs.map((tab) => ({
      ...tab,
      isActive: tab.route === clickRoute,
    }));
    setTabs(updatedTabs);
  };

  return tabs && tabs.length > 0 ? (
    tabs.map((tab, index) => (
      <li key={index}>
        <Link
          href={`${tab.route}`}
          onClick={tab.onClick}
          className={cn(
            "py-3 px-2 lg:px-5 text-xs lg:text-sm text-center",
            tab.isActive && "font-bold border-b-2 border-b-primary"
          )}
        >
          {tab.displayText}
        </Link>
      </li>
    ))
  ) : (
    <div>Please refresh your browser, you might have a poor connection</div>
  );
}
