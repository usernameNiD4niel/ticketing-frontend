"use client";
import { Badge } from "@/components/ui/badge";
import { AvailableTabs } from "@/constants/enums";
import { AccountProps, ProfileTabProps } from "@/constants/types";
import { useAuth } from "@/hooks/auth";
import useNavigationStore from "@/hooks/states/useNavigationStore";
import Avatar from "react-avatar";
import React, { FC, useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LoadingButton } from "@/components/utils/LoadingButton";
import DialogBoxAlert from "@/components/server/logout/DialogBoxAlert";

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
  ];

  const setActiveTab = useNavigationStore((state) => state.setActiveTab);

  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");

  const [account, setAccount] = useState<AccountProps | null>(null);

  const [isLoggingingOut, setIsLoggingOut] = useState(false);

  const { getSpecificAccount } = useAuth();

  const [tabs, setTabs] = useState<ProfileTabProps[]>(ProfileTabs);

  useEffect(() => {
    setActiveTab(AvailableTabs.Accounts);

    const getAccount = async () => {
      const email = Cookies.get("email");
      const token = Cookies.get("token");
      console.log("email: ", email);

      if (email) {
        const data: AccountProps = await getSpecificAccount({
          setError,
          setIsFetching,
          token,
          email,
        });

        setAccount(data);
      } else {
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

    setTabs(updatedTabs);

    console.log("use effect: ", account);
  }, []);

  const handleLogout = () => {
    setIsLoggingOut(true);
    Cookies.remove("email");
    Cookies.remove("token");
    Cookies.remove("it_access_level");
    Cookies.remove("hr_access_level");
    Cookies.remove("name");
    localStorage.clear();
  };

  const handleTabClick = (clickRoute: string) => {
    const updatedTabs = tabs.map((tab) => ({
      ...tab,
      isActive: tab.route === clickRoute,
    }));
    setTabs(updatedTabs);
  };

  const getRole = (
    role: string
  ): "requestor" | "champion" | "catalyst" | "supreme" => {
    switch (role.toLowerCase()) {
      case "requestor":
        return "requestor";
      case "unset":
        return "requestor";
      case "champion":
        return "champion";
      case "supreme":
        return "supreme";
      default:
        return "catalyst";
    }
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
    <>
      <main className="w-full">
        <section className="w-full flex items-center justify-center flex-col gap-y-3">
          <Avatar name={account.name} size="150" round={true} />
          <div className="flex gap-y-1 items-center justify-center flex-col">
            <Badge variant={getRole(account.access_level.it_access_level)}>
              {account.access_level.it_access_level.toUpperCase()}
            </Badge>
            <h2 className="text-2xl font-bold">{account.name}</h2>
            <p>{account.department}</p>
            <p className="text-sm underline underline-offset-1">
              @{account.email}
            </p>
            <p className="text-sm">
              Joined On: {account.created_at} - {account.created_time}
            </p>
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
      <footer className="fixed bottom-4 right-4 md:top-8 md:right-10">
        {isLoggingingOut ? (
          <LoadingButton isFullWidth={false} />
        ) : (
          <DialogBoxAlert onclick={handleLogout} />
        )}
      </footer>
    </>
  );
};

export default AccountLayout;
