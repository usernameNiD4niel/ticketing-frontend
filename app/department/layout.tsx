"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/utils/Header";
import { ModeToggle } from "@/components/utils/ModeToggle";
import { Metadata } from "next";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsTicketFill } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import { MdAccountBox } from "react-icons/md";

export const metadata: Metadata = {
  title: "OPPA | Dashboard",
  description:
    "OPPA Dashboard, views all of the tickets for specific department",
};

const RootLayoutDepartment = ({ children }: { children: React.ReactNode }) => {
  const { theme, systemTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<string>(
    `${theme === "system" ? systemTheme : theme}`
  );

  useEffect(
    () => setCurrentTheme(`${theme === "system" ? systemTheme : theme}`),
    [currentTheme]
  );
  return (
    <>
      <header className="flex w-full md:hidden items-center justify-between z-10 drop-shadow-md p-2 bg-[#EEF7FF] dark:bg-[#0C0A09] dark:drop-shadow-md h-16 fixed top-0 left-0">
        <Header />
      </header>
      <main className="mt-20 md:mt-10 w-full flex items-center justify-center">
        <aside className="w-20 fixed top-0 left-0 bottom-0 bg-[#EEF7FF] dark:bg-[#1a1919] drop-shadow-xl hidden md:flex gap-y-6 flex-col items-center justify-center">
          <Button className="text-center text-xl" variant="primaryActive">
            <FaHome />
          </Button>
          <Button className="text-xl text-center" variant="primaryInActive">
            <IoIosCreate />
          </Button>
          <Button className="text-xl text-center" variant="primaryInActive">
            <BsTicketFill />
          </Button>
          <Button className="text-xl text-center" variant="primaryInActive">
            <MdAccountBox />
          </Button>
          <Button className="text-xl text-center" variant="primaryInActive">
            <AiOutlineArrowRight />
          </Button>
        </aside>
        <section className="md:ml-20 w-full flex flex-col gap-y-4 px-2 md:px-9">
          <form className="w-full relative hidden md:block">
            <div className="absolute top-[13px] left-3 text-2xl opacity-60">
              <CiSearch />
            </div>
            <Input
              type="text"
              name="search"
              required
              placeholder="Search ticket (eg. Ticket No, Status, Date Posted)"
              className="py-6 pl-10 pr-3"
            />
          </form>
          {children}
        </section>
        <Button
          variant="secondary"
          className="absolute bottom-2 text-2xl right-2 p-3"
        >
          <IoAdd />
        </Button>
      </main>
      <footer className="fixed bottom-0 left-0 p-4">
        <ModeToggle />
      </footer>
    </>
  );
};

export default RootLayoutDepartment;
