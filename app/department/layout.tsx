"use client";
import Header from "@/components/utils/Header";
import MobileDrawer from "@/components/utils/MobileDrawer";
import { ModeToggle } from "@/components/utils/ModeToggle";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import useCounterStore from "@/hooks/states/useCounterStore";
import { useAuth } from "@/hooks/auth";

const RootLayoutDepartment = ({ children }: { children: React.ReactNode }) => {
  const { theme, systemTheme } = useTheme();

  const router = useRouter();
  const [currentTheme, setCurrentTheme] = useState<string>(
    `${theme === "system" ? systemTheme : theme}`
  );

  const [
    setPendingRoleCount,
    setUnhandledTicketsCount,
    unhandledTicketsCount,
    pendingRoleCount,
  ] = useCounterStore((state) => [
    state.setPendingRoleCount,
    state.setUnhandledTicketsCount,
    state.unhandledTicketsCount,
    state.pendingRoleCount,
  ]);

  // ! Fetch the data from the database
  // ! create a route that do this job done
  // ! that function should return a

  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const { getCurrentUserName, getUnsetCounts } = useAuth();

  useEffect(
    () => setCurrentTheme(`${theme === "system" ? systemTheme : theme}`),
    [currentTheme]
  );

  useEffect(() => {
    const token = Cookies.get("token");
    const email = Cookies.get("email");

    if (!token || !email) {
      router.push("/login");
    }

    const getName = async () => {
      const name = await getCurrentUserName(token);

      Cookies.set("name", name, { expires: 7 });
    };

    const unsetCounts = async () => {
      const { unset_user_count, unset_priority_ticket_count } =
        await getUnsetCounts(token);
      setPendingRoleCount(unset_user_count);
      setUnhandledTicketsCount(unset_priority_ticket_count);
    };

    unsetCounts();
    getName();
  }, []);

  return (
    <>
      <header className="flex w-full md:hidden items-center justify-between z-10 drop-shadow-md p-2 bg-[#EEF7FF] dark:bg-[#0C0A09] dark:drop-shadow-md h-16 fixed top-0 left-0">
        <Header />
      </header>
      <main className="mt-20 md:mt-10 w-full flex items-center justify-center">
        <MobileDrawer
          setIsDrawerOpen={setIsDrawerOpen}
          isDrawerOpen={isDrawerOpen}
          unhandledTicketsCount={unhandledTicketsCount}
          pendingRoleCount={pendingRoleCount}
        />
        <section
          className={cn(
            "w-full flex flex-col gap-y-4 px-2 md:px-9",
            isDrawerOpen ? "md:ml-[350px]" : "md:ml-20"
          )}
        >
          {children}
        </section>
      </main>
      <footer className="fixed bottom-0 left-0 p-4 z-10">
        <ModeToggle />
      </footer>
    </>
  );
};

export default RootLayoutDepartment;
