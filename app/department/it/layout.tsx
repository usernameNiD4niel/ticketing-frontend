import React from "react";
import { cookies } from "next/headers";
import { ClientCookiesProvider } from "./CookiesProvider";
import HelperLayout from "./layout3";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "OPPA | IT",
  description:
    "This is system is created for IT Department. This is a part of OPPA project",
};

const RootLayoutDepartment = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClientCookiesProvider value={cookies().getAll()}>
      <HelperLayout> {children}</HelperLayout>
    </ClientCookiesProvider>
  );
};

export default RootLayoutDepartment;
