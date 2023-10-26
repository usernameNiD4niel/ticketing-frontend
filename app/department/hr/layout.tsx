import Navigation from "@/components/server/hr/home/navigation";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "OPPA | HR",
  description:
    "This is system is created for HR Recruiters. This is a part of OPPA project",
};

const HrRootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="w-full md:max-w-xs bg-white fixed top-0 left-0 h-16 drop-shadow-sm md:h-screen">
        <Navigation />
      </header>
      <main className="w-full md:pl-[20rem]">{children}</main>
    </>
  );
};

export default HrRootLayout;
