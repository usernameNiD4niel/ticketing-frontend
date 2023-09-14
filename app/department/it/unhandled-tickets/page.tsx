"use client";
import { AvailableTabs } from "@/constants/enums";
import useNavigationStore from "@/hooks/states/useNavigationStore";
import React, { useEffect } from "react";

const UnhandledTickets = () => {
  const setActiveTab = useNavigationStore((state) => state.setActiveTab);
  useEffect(() => setActiveTab(AvailableTabs["Unhandled Tickets"]), []);
  return <div>UnhandledTickets</div>;
};

export default UnhandledTickets;
