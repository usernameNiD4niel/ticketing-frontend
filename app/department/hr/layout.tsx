import Navigation from "@/components/server/hr/home/navigation";
import React from "react";

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
