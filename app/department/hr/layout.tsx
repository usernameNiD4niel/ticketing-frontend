import "./styles/hr.css";
import Navigation from "@/components/server/hr/home/navigation";
import { ModeToggle } from "@/components/utils/ModeToggle";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "OPPA | HR",
  description:
    "This is system is created for HR Recruiters. This is a part of OPPA project",
};

const HrRootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <body className="bg-[#EFF3F4] dark:bg-[#0C0A09]">
      <header className="w-full md:max-w-xs fixed top-0 left-0 h-16 drop-shadow-sm md:h-screen dark:bg-[#2C2C2C]/20 bg-white">
        <Navigation />
      </header>
      <main className="w-full md:pl-[20rem]">{children}</main>
      <footer className="fixed bottom-0 left-0 p-4 z-10">
        <ModeToggle />
      </footer>
    </body>
  );
};

export default HrRootLayout;
