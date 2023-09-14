"use client";
import { Badge } from "@/components/ui/badge";
import { AvailableTabs } from "@/constants/enums";
import { AccountProps, ProfileTabProps } from "@/constants/types";
import { useAuth } from "@/hooks/auth";
import useNavigationStore from "@/hooks/states/useNavigationStore";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { cn } from "@/lib/utils";

type AccountLayoutProps = {
  children: React.ReactNode;
};

const AccountLayout: FC<AccountLayoutProps> = ({ children }) => {
  const ProfileTabs: ProfileTabProps[] = [
    {
      displayText: "Recent",
      isActive: true,
      route: "recent",
      onClick: () => handleTabClick("recent"),
    },
    {
      displayText: "Edit Profile",
      isActive: false,
      route: "edit-profile",
      onClick: () => handleTabClick("edit-profile"),
    },
    {
      displayText: "Update Password",
      isActive: false,
      route: "update-password",
      onClick: () => handleTabClick("update-password"),
    },
    {
      displayText: "Settings",
      isActive: false,
      route: "settings",
      onClick: () => handleTabClick("settings"),
    },
  ];
  const setActiveTab = useNavigationStore((state) => state.setActiveTab);

  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");

  const [account, setAccount] = useState<AccountProps | null>(null);

  const { getSpecificAccount } = useAuth();

  const [tabs, setTabs] = useState<ProfileTabProps[]>(ProfileTabs);

  useEffect(() => {
    setActiveTab(AvailableTabs.Accounts);

    const getAccount = async () => {
      const email = Cookies.get("email");
      const token = Cookies.get("token");

      if (email) {
        const data: AccountProps = await getSpecificAccount({
          setError,
          setIsFetching,
          token,
          email,
        });

        console.log("email: ", email);

        setAccount(data);
      } else {
        console.log("email: ", email);
        setAccount(null);
      }
    };

    getAccount();

    // Get the current URL pathname and set the active tab based on it
    const splittedPath = window.location.pathname.split("/");
    let currentPathname = splittedPath[splittedPath.length - 1];

    const updatedTabs = tabs.map((tab) => ({
      ...tab,
      isActive: tab.route === currentPathname,
    }));
    console.log("Current Path: ", currentPathname);

    setTabs(updatedTabs);

    console.log("use effect: ", account);
  }, []);

  const handleTabClick = (clickRoute: string) => {
    const updatedTabs = tabs.map((tab) => ({
      ...tab,
      isActive: tab.route === clickRoute,
    }));
    setTabs(updatedTabs);
  };

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error} test</div>;
  }

  if (!account) {
    return <div>Account not found</div>;
  }
  return (
    <main className="w-full">
      <section className="w-full flex items-center justify-center flex-col gap-y-3">
        <Image
          src="/nobita.svg"
          alt="Nobita picture"
          width={350}
          height={350}
          className="w-[150px] h-auto rounded-full"
        />
        <div className="flex gap-y-1 items-center justify-center flex-col">
          <Badge variant="requestor">{account.role.toUpperCase()}</Badge>
          <h2 className="text-2xl font-bold">{account.name}</h2>
          <p>{account.department}</p>
          <p className="text-sm">@{account.email}</p>
          <p className="text-sm">Joined On: {account.created_at}</p>
        </div>
      </section>
      <ul className="flex gap-x-2 items-center border-b-[1px] justify-center border-b-[#ccc] py-3 mt-10 dark:border-b-[#ccc]/20 flex-wrap">
        {tabs.map((tab, index) => (
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
        ))}
      </ul>
      <section>{children}</section>
    </main>
  );
};

export default AccountLayout;
