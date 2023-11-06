import React from "react";
import HelperLayout from "./layout3";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "OPPA | IT",
  description:
    "This is system is created for IT Department. This is a part of OPPA project",
};

const RootLayoutDepartment = ({ children }: { children: React.ReactNode }) => {
  return <HelperLayout> {children}</HelperLayout>;
};

export default RootLayoutDepartment;
