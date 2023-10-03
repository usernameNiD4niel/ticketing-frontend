"use client";

import { AvailableTabs } from "@/constants/enums";
import useNavigationStore from "@/hooks/states/useNavigationStore";
import React from "react";

const UnHandledTab = () => {
  const setActiveTab = useNavigationStore((state) => state.setActiveTab);

  React.useEffect(() => {
    setActiveTab(AvailableTabs["Unhandled Tickets"]);
  }, []);
  return <div></div>;
};

export default UnHandledTab;
