"use client";

import { AvailableTabs } from "@/constants/enums";
import useNavigationStore from "@/hooks/states/useNavigationStore";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

type UnHandledTabProps = {
  role: string;
};

const UnHandledTab: FC<UnHandledTabProps> = ({ role }) => {
  const setActiveTab = useNavigationStore((state) => state.setActiveTab);

  const router = useRouter();

  React.useEffect(() => {
    if (role.toUpperCase() === "UNSET" || role.toUpperCase() === "REQUESTOR") {
      router.back();
    }
    setActiveTab(AvailableTabs["Unhandled Tickets"]);
  }, []);
  return <div></div>;
};

export default UnHandledTab;
