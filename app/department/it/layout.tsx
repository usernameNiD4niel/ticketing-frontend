import React from "react";
import { cookies } from "next/headers";
import { ClientCookiesProvider } from "./CookiesProvider";
import HelperLayout from "./layout3";

const RootLayoutDepartment = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClientCookiesProvider value={cookies().getAll()}>
      <HelperLayout> {children}</HelperLayout>
    </ClientCookiesProvider>
  );
};

export default RootLayoutDepartment;
