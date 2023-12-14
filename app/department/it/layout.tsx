import React from "react";
import HelperLayout from "./layout3";
import { Metadata } from "next";
import { getNavigationCount, getNotificationCount } from "@/endpoints";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "OPPA | IT",
  description:
    "This is system is created for IT Department. This is a part of OPPA project",
};

const RootLayoutDepartment = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const { unset_user_count, unset_priority_ticket_count, my_assigned_tickets } =
    await getNavigationCount(token);
  const count = await getNotificationCount(token);

  return (
    <HelperLayout
      unset_user_count={unset_user_count}
      user_priority_ticket_count={unset_priority_ticket_count}
      my_assigned_tickets={my_assigned_tickets}
      count={count}
    >
      {children}
    </HelperLayout>
  );
};

export default RootLayoutDepartment;
