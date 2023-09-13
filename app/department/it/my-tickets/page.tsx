"use client";
import { AvailableTabs } from "@/constants/enums";
import useNavigationStore from "@/hooks/states/useNavigationStore";
import React, { useEffect } from "react";

const MyTickets = () => {
  const [setActiveTab] = useNavigationStore((state) => [state.setActiveTab]);

  useEffect(() => {
    setActiveTab(AvailableTabs["My Tickets"]);
  }, []);

  return <div>MyTickets</div>;
};

export default MyTickets;
